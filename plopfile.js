const fs = require('fs');
const ts = require("typescript");
const requireFromString = require('require-from-string');


const GQL_QUERY_PATH = __dirname + "/src/api/gql/queries/";
const queries = fs.readdirSync(GQL_QUERY_PATH)
    .map(file => file.toString().split(".")[0]);

const GQL_MUTATION_PATH = __dirname + "/src/api/gql/mutations/";
const mutations = fs.readdirSync(GQL_MUTATION_PATH)
    .map(file => file.toString().split(".")[0]);

module.exports = function (plop) {

    plop.setGenerator('StyledComponent', {
        description: 'New styled React Component',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Component name please'
        },{
            type: "confirm",
            name: "state",
            default: false,
            message: "state?"
        }],
        actions: [{
            type: 'add',
            path: 'src/{{name}}.tsx',
            templateFile: 'plop-templates/StyledComponent.hbs'
        }]
    });


    plop.setGenerator('GQLContainer', {
        description: 'New GQL Container',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Name:'
        },{
            type: 'checkbox',
            name: 'queries',
            message: 'Queries:',
            filter: (answers) => {
                return answers.map(answer => {
                    return {name: answer, vars:extractGQLVariableInfo(answer, GQL_QUERY_PATH)}
                });
            },
            choices: queries
        },{
            type: 'checkbox',
            name: 'mutations',
            message: 'Mutations:',
            choices: mutations,
            filter: (answers) => {
                return answers.map(answer => {
                    return {name: answer, vars:extractGQLVariableInfo(answer, GQL_MUTATION_PATH)}
                });
            }
        }
        ],
        actions: [{
            type: 'add',
            path: process.cwd() +'/{{name}}.tsx',
            templateFile: 'plop-templates/GQLContainer.hbs'
        }]
    });
};


function extractGQLVariableInfo(fileName, basepath){

    const jsString = ts.transpileModule(fs.readFileSync(basepath + fileName + ".ts", { encoding: 'utf8' }),
        {compilerOptions: { module: ts.ModuleKind.CommonJS }}
    ).outputText;

    const document = requireFromString(jsString).default;

    if(!document) return;

    const varDefs = document.definitions[0].variableDefinitions;
    if(!varDefs) return;

    const vars = varDefs.map(varDef => {
        return varDef.variable;
    });
    if(!vars) return;

    const varNames = vars.map(variable => {
        return variable.name.value;
    });
    const varTypes = varDefs.map(varDef => {
        let type = varDef.type;
        let required = false;
        if(type.kind === "NonNullType"){
            type = type.type;
            required = true;
        }
        if(type.kind === "NamedType"){
            type = type.name.value;
        }

        if(GQLtoTSTypeMap.hasOwnProperty(type)){
            type = GQLtoTSTypeMap[type];
        }else{
            type = "string";
        }

        return required ? {type: type, required: true} : {type: type, required: false};
    });

    return varTypes.map(function(type, i) {
        return {...type, name: varNames[i]};
    });
}

const GQLtoTSTypeMap = {};