import generator from "generate-password";

export const pass_generator = () => {
    // generate passw
    const passw = generator.generate({
        length: 7,
        numbers: true
    });
    // store pass to check before updating the admin passw
    process.env.GEN_PASS = passw
    return passw
}