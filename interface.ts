interface user{
    name: string
    email: string
}

let u: user={
    name:"rahat",
    email:"bmrahatalmas@gmail.com"
}

// let a: user={
//     name:"abcd",
// }

type p_user = Partial<user>

let u_u: p_user={
    name:"rahat almas"
}
console.log(u)
console.log(u_u)
