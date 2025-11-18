interface user{
    name: string
    email: string
}

let u: user={
    name:"rahat",
    email:"bmrahatalmas@gmail.com"
}

type p_user = Partial<user>

let u_u: p_user={
    name:"rahat almas"
}
console.log(u)
console.log(u_u)
