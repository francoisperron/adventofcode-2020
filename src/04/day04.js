const validPasswordsPart1 = batchFile => parseBatchFile(batchFile).map(p => arePassportFieldsValid(p)).filter(valid => valid).length
const validPasswordsPart2 = batchFile => parseBatchFile(batchFile).map(p => arePassportValuesValid(p)).filter(valid => valid).length

const parseBatchFile = batchFile => batchFile.split('\n\n')

const arePassportFieldsValid = passport => passport.match(/(byr|hcl|iyr|eyr|ecl|pid|hgt)/g).length === 7

const arePassportValuesValid = passport => {
  const byrMatcher = /^byr:(19[2-9][0-9])|(200[0-2])$/
  const iyrMatcher = /^iyr:(201[0-9])|(2020)$/
  const eyrMatcher = /^eyr:(202[0-9])|(2030)$/
  const hgtMatcherCm = /^hgt:(1[5-8][0-9]|19[0-3])cm$/
  const hgtMatcherIn = /^hgt:(59|6[0-9]|7[0-6])in$/
  const hclMatcher = /^hcl:#[0-9a-f]{6}$/
  const eclMatcher = /^ecl:(amb|blu|brn|gry|grn|hzl|oth)$/
  const pidMatcher = /^pid:([0-9]{9})$/

  const matches = part => byrMatcher.test(part)
    || iyrMatcher.test(part)
    || eyrMatcher.test(part)
    || hgtMatcherCm.test(part)
    || hgtMatcherIn.test(part)
    || hclMatcher.test(part)
    || eclMatcher.test(part)
    || pidMatcher.test(part)

  return passport.split(/[ \n]/)
    .map(part => matches(part))
    .filter(valid => valid)
    .length === 7
}

export { validPasswordsPart1, validPasswordsPart2, parseBatchFile, arePassportFieldsValid, arePassportValuesValid }

