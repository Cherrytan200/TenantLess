import {users} from "./users.ts";
import type { User } from "./users.ts";

export function filterByDepartment(users:User[],department:string):User[]{
    return users.filter((user)=>
        user.department==department
    )
}

export function filterByMFA(users:User[],isEnabled:boolean):User[]{
    return users.filter((user)=>
        user.mfaEnabled==isEnabled
    )
}

export function sortByLastSignin(users:User[],order:string):User[]{
    return users.sort((a,b)=>{
        const dif=a.lastSignin.getTime()-b.lastSignin.getTime();
        return order==='asc'? dif:-dif
    })
}

export function searchByName(users:User[],text:string):User[]{
    return users.filter((user)=>
        user.displayName.toLowerCase().includes(text.toLowerCase())
    )
}

export function groupBy(users:User[]):Record<string,User[]>{
    return users.reduce<Record<string, User[]>>((a, user) => {
        user.licenses.forEach((u) => {
            if (!a[u]) {
                a[u] = [];
            }
            a[u].push(user);
        });
        return a;
    }, {});
}


export function countByMfa(users:User[]):Record<string,number>{
    return users.reduce<Record<string,number>>((res,user)=>{
        if(user.mfaEnabled){
            res.enabled++;
        }else{
            res.disabled++;
        }
        return res;
    },{enabled:0,disabled:0})
}

export function uniqueDepartment(users:User[]):string[]{
    return users.reduce<string[]>((res,user)=>{
        if(!res.includes(user.department)){
            res.push(user.department);
        }
        return res;
    },[])
}

export function topNBySignin(users:User[],n:number):User[]{
    return users.sort((a,b)=>{
        return a.lastSignin.getTime()-b.lastSignin.getTime()
    }).slice(0,n)
}

export function splitActiveInActive(users:User[]):Record<string,User[]>{
    return users.reduce<Record<string,User[]>>((res,user)=>{
        if(user.mfaEnabled){
            res.active.push(user);
        }else{
            res.inactive.push(user);
        }
        return res;
    },{active:[],inactive:[]})
}

// setTimeout(()=>{
//     Promise.resolve().then(()=>{
//         console.log("C");
//     })
//     console.log("A");
// },0)
// console.log("B");

// console.log("testing");
//start of the event loop

// console.log("A")

// setTimeout(() => {
//   console.log("B");
// }, 0);

// console.log("C");

//A->C->B



// console.log("A");

// setTimeout(() => {
//   console.log("B");
// }, 0);

// Promise.resolve().then(() => {
//   console.log("C");
// });

// console.log("D");

//A->D->C->B



// setTimeout(() => {
//   console.log("A");

//   Promise.resolve().then(() => {
//     console.log("B");
//   });

//   console.log("C");
// }, 0);

// console.log("D");
//D->A->C->B


// console.log("A");

// Promise.resolve().then(() => {
//   console.log("B");

//   Promise.resolve().then(() => {
//     console.log("C");
//   });
// });

// Promise.resolve().then(() => {
//   console.log("D");
// });

// console.log("E");
//A->E->B->D->C


// async function test() {
//   console.log("A");

//   await Promise.resolve();

//   console.log("B");
// }

// test();

// console.log("C");
//A->B->C



// setTimeout(async () => {
//   console.log("A");

//   await Promise.resolve();

//   console.log("B");
// }, 0);

// Promise.resolve().then(() => {
//   console.log("C");
// });

// console.log("D");
// //D,C,A,B


setTimeout(() => {
  console.log("A");

  Promise.resolve().then(() => {
    console.log("B");
  });
}, 0);

setTimeout(() => {
  console.log("C");
}, 0);

Promise.resolve().then(() => {
  console.log("D");
});

console.log("E");
//E,D,A,C,B
//E → D → A → B → C


async function test() {
  console.log("A");

  await Promise.resolve();

  console.log("B");

  await Promise.resolve();

  console.log("C");
}

test();

Promise.resolve().then(() => {
  console.log("D");
});

console.log("E");
//A,E,B,D,C

//A → E → B → D → C


console.log("A");
async function test2(){
    await Promise.resolve();
    setTimeout(async () => {
        console.log("B");
        await Promise.resolve();
        Promise.resolve().then(() => {
            console.log("C");
        });

        setTimeout(() => {
            console.log("D");
        }, 0);

        console.log("E");
    }, 0);
    console.log("H")
    Promise.resolve().then(() => {
        console.log("I");
    });
}

test2();
Promise.resolve().then(() => {
  console.log("F");
});

console.log("G");
//A,G,F,B,E,C,D
//A → G → F → B → E → C → D
//A->G->H->F->I->B->E->C->D

async function first() {
  console.log("A");

  await Promise.resolve();

  console.log("B");

  Promise.resolve().then(() => {
    console.log("C");
  });
}

console.log("D");

setTimeout(() => {
  console.log("E");
}, 0);

first();

Promise.resolve().then(() => {
  console.log("F");
});

console.log("G");
//D,A,G,F,E,B,C

//D → A → G → F → B → C → E

  
