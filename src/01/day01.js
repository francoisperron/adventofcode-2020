const reportRepair = entries => {
  for (const e1 of entries) {
    for (const e2 of entries) {
      if (e1 + e2 === 2020) {
        return e1 * e2
      }
    }
  }
}

const reportRepairPart2 = entries => {
  for (const e1 of entries) {
    for (const e2 of entries) {
      for (const e3 of entries) {
        if (e1 + e2 + e3 === 2020) {
          return e1 * e2 * e3
        }
      }
    }
  }
}

export { reportRepair, reportRepairPart2 }
