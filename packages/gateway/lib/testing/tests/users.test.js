import * as UserService from '../../services/users';
import { testUsers } from '../test-data/users.data';

// expect.addSnapshotSerializer({
//     test:(val) => val.id && val.category && val.description && val.imageURL,
//     print:(val) => 
//      `id: ${val.id}
//       category: ${val.category}
//       description: ${val.description}
//       imageURL: ${val.imageURL}`
// })

/** Test get sellers users */
test('User-Service: getAllUsers()', () => {
    UserService.getAllUsers = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
            resolve(testUsers)
        })
    });
    UserService.getAllUsers()
        .then(allUsers => 
            expect(allUsers).toMatchSnapshot()
        );
});

/** test get user by id */
test('User-Service: getUserById(userID)', () => {
    UserService.getUserById = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
            resolve({
                id: "123",
                userName: "John Doe"
            })
        })
    });
    UserService.getUserById("123")
        .then(response => 
            expect(response).toEqual({
                id: "123",
                userName: "John Doe"
            })
        );
});

/** test add new user */
test('User-Service: createUser(userData)', () => {
    UserService.createUser = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
            resolve({
                docID: "some-new-docID"
            })
        })
    });
    UserService.createUser("some-new-user-data")
        .then(response => 
            expect(response).toEqual({docID: "some-new-docID"})
        );
});

// const userId = "7KtTK9jXBT9HaU0bZ3uC";
// test('User-Service: getUserById() for user: 7KtTK9jXBT9HaU0bZ3uC', () => {
//     return Users.default.getUserById(userId).then(user => {
//         // console.log(user)
//         // expect.assertions(11)
//         expect(user).toBeDefined();
//         expect(user).toMatchObject({
//             address: expect.anything(),
//             birthdate: expect.any(String),
//             email: expect.any(String),
//             fullName: expect.any(String),
//             publicKey: expect.any(String),
//             userName: expect.any(String)
//               // expect(user.address).toMatchObject({
//             //     shipPhone: expect.any(String),
//             //     shipContactName: expect.any(String),
//             //     shipCompany_name: expect.any(String),
//             //     shipState: expect.any(String),
//             //     shipEmail: expect.any(String),
//             //     shipCountry: expect.any(String),
//             //     shipCity: expect.any(String),
//             // }),
//             // phone: expect.any(Number),
//             // numberOfItemsSold: expect.any(String),
//             // myProducts: expect.any(String),
//             // acceptedAssets: expect.any(String)
//         });
//     });
// });

// const newUser = {

// };

// test('User-Service: createUser()', () => {
//     // expect(newUser).toBeInstanceOf(User) .. ? 
// expect(user).toMatchObject({
//     address: expect.anything(),
//     birthdate: expect.any(String),
//     email: expect.any(String),
//     fullName: expect.any(String),
//     publicKey: expect.any(String),
//     userName: expect.any(String),
    
//     return Users.default.createUser().then(newUserID => {
//         console.log(newUserID)
//         return expect(newUserID).toBeDefined();
//     });
// });


// const privSignatureToVerify = "...";
// test('User-Service: verifySignature() for user: ...', () => {
//     expect(privSignatureToVerify).toBeDefined();
//     const localPubFromPriv = stellar.Keypair.fromPublicKey(privSignatureToVerify);
//     const serverPubFromPriv = Users.default.verifySignature(/* what goes here */);
//     expect(localPubFromPriv).toBeDefined();
//     expect(serverPubFromPriv).toBeDefined();
//     expect(localPubFromPriv).toEqual(serverPubFromPriv)
//     expect(localPubFromPriv).toBe(serverPubFromPriv)
// });

// const toDeleteUserId = "...";
// test('User-Service: deleteUser() for user: ...', () => {
//     return Users.default.deleteUserId(toDeleteUserId).then(deletedUserId => {
//         console.log(deletedUserId)
//         expect(deletedUserId).toBeDefined();
//         expect(deletedUserId).toBe(toDeleteUserId);
//     });
// });