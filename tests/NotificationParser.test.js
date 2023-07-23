
const parser = require('../Middleware/NotificationParser');

test("Parser Test 1 - Normal String", () => {

    const testString = `Hello {username123}`;

    let result = parser.parseForTags(testString, true);
    expect(result).toStrictEqual(['username123'])
    
    result = parser.parseForTags(testString, false);
    expect(result).toStrictEqual(['{username123}'])
    
});

test("Parser Test 2 - String with no tags", () => {

    const testString = `Hello Barter`;

    let result = parser.parseForTags(testString, true);
    expect(result).toStrictEqual([])
    
    result = parser.parseForTags(testString, false);
    expect(result).toStrictEqual([])
    
});