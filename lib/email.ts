export async function sendEmail(to: string, subject: string, body: string) {
    console.log(`--- E-Mail an ${to} ---`);
    console.log(`Betreff: ${subject}`);
    console.log(body);
}