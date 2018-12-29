import * as contentful from 'contentful'


const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "hzozipowq7kx",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "8bf0b2a52f6a78986b977dde3e4af9ff8b976a5e47cf616cc6a56a0ff5d4e54d"
});




export {
    client
}