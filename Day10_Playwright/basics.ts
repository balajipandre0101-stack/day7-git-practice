// Function
function greet(name: string): string {
    return "Hello " + name;
}

console.log(greet("Balaji"));

// Array
let browsers: string[] = [
    "Chrome",
    "Firefox",
    "WebKit"
];

console.log(browsers);

// Object
let tester = {
    name: "Balaji",
    experience: 2,
    role: "QA Engineer"
};

console.log(tester);
async function login() {

    console.log("Opening login page");

    await new Promise(resolve =>
        setTimeout(resolve, 2000)
    );

    console.log("Login successful");

}

login();
class LoginPage {

    username: string;

    constructor(username: string) {
        this.username = username;
    }

    async login() {

        console.log("Username: " + this.username);

        await new Promise(resolve =>
            setTimeout(resolve, 2000)
        );

        console.log("Login completed");

    }

}

async function main() {

    const page = new LoginPage("Balaji");

    await page.login();

}

main();
