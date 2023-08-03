
const logger = require('../startup/loggingSetup');
const parser = require('../../utils/NotificationParser');

test("Parser Test 1 - parseForTags1 - Normal String", () => {

    logger.info = jest.fn();

    const testString = `Hello {username123}`;

    let result = parser.parseForTags(testString, true);
    expect(result).toContain('username123')
    
    result = parser.parseForTags(testString, false);
    expect(result).toContain('{username123}')
    
});

test("Parser Test 2 - parseForTags2 - String with no tags", () => {

    logger.info = jest.fn();

    const testString = `Hello Barter`;

    let result = parser.parseForTags(testString, true);
    expect(result).toStrictEqual([])
    
    result = parser.parseForTags(testString, false);
    expect(result).toStrictEqual([])
    
});

test("Parser Test 3 - parseAndFillTags1 - Normal Case", () => {

    logger.info = jest.fn();

    let testString = `Hello {username123}`;

    let result = parser.parseAndFillTags(testString, {'username123': 'Barter'});
    expect(result).toMatch('Hello Barter');

    testString = `Hello {user},
    Hope you are well.
    I am {sender}.
    {end_greeting}.`

    result = parser.parseAndFillTags(testString, {
        'user' : 'Mr. Alker',
        'end_greeting' : 'Regards',
        'sender' : 'Mr. X'
    })

    expect(result).toMatch(`Hello Mr. Alker,
    Hope you are well.
    I am Mr. X.
    Regards.`)

})

test("Parser Test 4 - parseAndFillTags2 - Normal Case", () => {

    logger.info = jest.fn();

    testString = `Hello user,
    Hope you are well.
    greeting.`

    result = parser.parseAndFillTags(testString, {
        'user' : 'Mr. Alker',
        'end_greeting' : 'Regards',
        'sender' : 'Mr. X'
    })

    expect(result).toMatch(`Hello user,
    Hope you are well.
    greeting.`)

})

test("Parser Test 5 - parseAndFillTags3 - unequal number of tags in template and tags list", () => {

    logger.info = jest.fn();

    let testString = `Hello {username123}.
    Today is {date}`;

    expect( () => {
        parser.parseAndFillTags(testString, {'username123': 'Barter'});
    })
    .toThrow(Error); 

})

test("Parser Test 6 - parseAndFillTags4 - inconsistent tags in template and tags list", () => {

    logger.info = jest.fn();

    let testString = `Hello {username123}.
    Today is {date}`;

    expect( () => {
        parser.parseAndFillTags(testString, {
            'username123': 'Barter',
            'day' : 'monday'
        });
    })
    .toThrow(Error); 

})

