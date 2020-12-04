import { dailyInput } from '../dailyInput.js'
import { arePassportFieldsValid, arePassportValuesValid, parseBatchFile, validPasswordsPart1, validPasswordsPart2 } from './day04.js'

const range = (from, to) => Array.from(Array(to - from + 1), (x, index) => from + index)

describe('Day 4: Passport Processing', () => {

  let entries
  before('get input', async () => {
    entries = await dailyInput(4)
  })

  describe('Part 1: How many passports fields are valid?', () => {

    const example = 'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\n' +
      'byr:1937 iyr:2017 cid:147 hgt:183cm\n' +
      '\n' +
      'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884\n' +
      'hcl:#cfa07d byr:1929\n' +
      '\n' +
      'hcl:#ae17e1 iyr:2013\n' +
      'eyr:2024\n' +
      'ecl:brn pid:760753108 byr:1931\n' +
      'hgt:179cm\n' +
      '\n' +
      'hcl:#cfa07d eyr:2025 pid:166559648\n' +
      'iyr:2011 ecl:brn hgt:59in'

    describe('a passport', () => {
      it('is valid when byr, iyr, eyr, hgt, hcl, ecl, pid fields are present', () => {
        expect(arePassportFieldsValid('hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn pid:760753108 byr:1931 hgt:179cm')).to.be.true
      })

      it('is invalid when a field is missing', () => {
        expect(arePassportFieldsValid('hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn pid:760753108 hgt:179cm'), 'byr').to.be.false
        expect(arePassportFieldsValid('iyr:2013 eyr:2024 ecl:brn pid:760753108 byr:1931 hgt:179cm', 'hcl')).to.be.false
        expect(arePassportFieldsValid('hcl:#ae17e1 eyr:2024 ecl:brn pid:760753108 byr:1931 hgt:179cm', 'iyr')).to.be.false
        expect(arePassportFieldsValid('hcl:#ae17e1 iyr:2013 ecl:brn pid:760753108 byr:1931 hgt:179cm', 'eyr')).to.be.false
        expect(arePassportFieldsValid('hcl:#ae17e1 iyr:2013 eyr:2024 pid:760753108 byr:1931 hgt:179cm', 'ecl')).to.be.false
        expect(arePassportFieldsValid('hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn byr:1931 hgt:179cm', 'pid')).to.be.false
        expect(arePassportFieldsValid('hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn pid:760753108 byr:1931', 'hgt')).to.be.false
      })
    })

    describe('the batch file', () => {
      it('splits passports', () => {
        expect(parseBatchFile(example).length).to.equal(4)
      })
    })

    it('solves the example', () => {
      expect(validPasswordsPart1(example)).to.equal(2)
    })

    it('solves it', () => {
      expect(validPasswordsPart1(entries)).to.equal(260)
    })
  })

  describe('Part 2: How many passports fields and values are valid?', () => {

    const example = 'eyr:1972 cid:100\n' +
      'hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926\n' +
      '\n' +
      'iyr:2019\n' +
      'hcl:#602927 eyr:1967 hgt:170cm\n' +
      'ecl:grn pid:012533040 byr:1946\n' +
      '\n' +
      'hcl:dab227 iyr:2012\n' +
      'ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277\n' +
      '\n' +
      'hgt:59cm ecl:zzz\n' +
      'eyr:2038 hcl:74454a iyr:2023\n' +
      'pid:3556412378 byr:2007\n' +
      '\n' +
      'pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980\n' +
      'hcl:#623a2f\n' +
      '\n' +
      'eyr:2029 ecl:blu cid:129 byr:1989\n' +
      'iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm\n' +
      '\n' +
      'hcl:#888785\n' +
      'hgt:164cm byr:2001 iyr:2015 cid:88\n' +
      'pid:545766238 ecl:hzl\n' +
      'eyr:2022\n' +
      '\n' +
      'iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719'

    it('validates birth years between 1920 and 2002', () => {
      const invalidYears = [1919, 2003]
      invalidYears.forEach(year => expect(arePassportValuesValid(`byr:${year} pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 hcl:#623a2f`), '1919').to.be.false)

      const validYears = range(1920, 2002)
      validYears.forEach(year => expect(arePassportValuesValid(`byr:${year} pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 hcl:#623a2f`), year).to.be.true)
    })

    it('validates issue years between 2010 and 2020', () => {
      const invalidYears = [2009, 2021]
      invalidYears.forEach(year => expect(arePassportValuesValid(`iyr:${year} byr:1920 pid:087499704 hgt:74in ecl:grn eyr:2030 hcl:#623a2f`), year).to.be.false)

      const validYears = range(2010, 2020)
      validYears.forEach(year => expect(arePassportValuesValid(`iyr:${year} byr:1920 pid:087499704 hgt:74in ecl:grn eyr:2030 hcl:#623a2f`), year).to.be.true)
    })

    it('validates expiration years between 2020 and 2030', () => {
      const invalidYears = [2019, 2031]
      invalidYears.forEach(year => expect(arePassportValuesValid(`eyr:${year} iyr:2012 byr:1920 pid:087499704 hgt:74in ecl:grn hcl:#623a2f`), year).to.be.false)

      const validYears = range(2020, 2030)
      validYears.forEach(year => expect(arePassportValuesValid(`eyr:${year} iyr:2012 byr:1920 pid:087499704 hgt:74in ecl:grn hcl:#623a2f`), year).to.be.true)
    })

    it('validates height between 150 and 193cm or 59 and 76in', () => {
      const invalidHeightsCm = [149, 194]
      invalidHeightsCm.forEach(height => expect(arePassportValuesValid(`hgt:${height}cm eyr:2020 iyr:2012 byr:1920 pid:087499704 ecl:grn hcl:#623a2f`), height).to.be.false)

      const validHeightsCm = range(150, 193)
      validHeightsCm.forEach(height => expect(arePassportValuesValid(`hgt:${height}cm eyr:2020 iyr:2012 byr:1920 pid:087499704 ecl:grn hcl:#623a2f`), height).to.be.true)

      const invalidHeightsIn = [58, 77, 176]
      invalidHeightsIn.forEach(height => expect(arePassportValuesValid(`hgt:${height}in eyr:2020 iyr:2012 byr:1920 pid:087499704 ecl:grn hcl:#623a2f`), height).to.be.false)

      const validHeightsIn = range(59, 76)
      validHeightsIn.forEach(height => expect(arePassportValuesValid(`hgt:${height}in eyr:2020 iyr:2012 byr:1920 pid:087499704 ecl:grn hcl:#623a2f`), height).to.be.true)
    })

    it('validates hair color as a valid rgb string', () => {
      expect(arePassportValuesValid('hcl:#123abc hgt:74in eyr:2020 iyr:2012 byr:1920 pid:000000001 ecl:grn'), 'hcl:#123abc').to.be.true
      expect(arePassportValuesValid('hcl:#123abz hgt:74in eyr:2020 iyr:2012 byr:1920 pid:087499704 ecl:grn'), 'hcl:#123abz').to.be.false
      expect(arePassportValuesValid('hcl:123abc hgt:74in eyr:2020 iyr:2012 byr:1920 pid:087499704 ecl:grn'), 'hcl:123abc').to.be.false
    })

    it('validates eye color in [amb blu brn gry grn hzl oth]', () => {
      const validColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
      validColors.forEach(color => expect(arePassportValuesValid(`ecl:${color} hcl:#123abc hgt:74in eyr:2020 iyr:2012 pid:087499704 byr:1920`), color).to.be.true)

      expect(arePassportValuesValid('ecl:ambb hcl:#123abc hgt:74in eyr:2020 iyr:2012 byr:1920 pid:087499704'), 'ecl:ambb').to.be.false
    })

    it('validates passport id', () => {
      expect(arePassportValuesValid('pid:000000001 ecl:blu hcl:#123abc hgt:74in eyr:2020 iyr:2012 byr:1920'), '000000001').to.be.true
      expect(arePassportValuesValid('ecl:blu hcl:#123abc hgt:74in eyr:2020 iyr:2012 byr:1920 pid:000000001'), '000000001 end').to.be.true
      expect(arePassportValuesValid('ecl:blu hcl:#123abc hgt:74in eyr:2020 iyr:2012 byr:1920 pid:000000001\n'), '000000001 end').to.be.true
      expect(arePassportValuesValid('pid:0123456789 ecl:blu hcl:#123abc hgt:74in eyr:2020 iyr:2012 byr:1920'), '0123456789').to.be.false
    })

    it('solves example', () => {
      expect(validPasswordsPart2(example)).to.equal(4)
    })

    it('solves it', () => {
      expect(validPasswordsPart2(entries)).to.equal(153)
    })

  })
})


