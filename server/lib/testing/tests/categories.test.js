import * as CategoryService from '../../services/category.service'
import { categories, categoryIDs } from "../test-data/category.data";

/** test create new category */
test('Category-Service: createNewCategory(newCategory)', () => {
    CategoryService.createNewCategory = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
            resolve({
                docID: "some-new-docID"
            })
        })
    });
    CategoryService.createNewCategory("some new category")
        .then(response => 
            expect(response).toEqual({docID: "some-new-docID"})
        );
});

/** test serialize categories */
expect.addSnapshotSerializer({
    test:(val) => val.id && val.category && val.description && val.imageURL,
    print:(val) => 
     `id: ${val.id}
      category: ${val.category}
      description: ${val.description}
      imageURL: ${val.imageURL}`
})

/** test get sellers categories */
test('Category-Service: getAllCategories()', () => {
    CategoryService.getAllCategories = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
            resolve(categories)
        })
    });
    CategoryService.getAllCategories()
        .then(testCategories => 
            expect(testCategories).toMatchSnapshot()
        );
});

/** test individual categories */
categoryIDs.map(categoryID => {
    it(`Category-Service: getCategoryByID(${categoryID})`, () => {
        CategoryService.getCategoryByID = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                const thisCategory = categories.find(cat => cat.id === categoryID);
                resolve(thisCategory)
            })
        });
        CategoryService.getCategoryByID(categoryID)
            .then(category => {
                expect(category).toMatchSnapshot()
                expect(category).toHaveProperty("id", categoryID);
                expect(category).toEqual(
                    expect.objectContaining({
                        id: expect.any(String),
                        category: expect.any(String),
                        description: expect.any(String),
                        imageURL: expect.any(String)
                    })
                );
            });
    });
});
