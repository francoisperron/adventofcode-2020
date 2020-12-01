const reportRepair = entries => {
  for (let i = 0; i < entries.length; i++) {
    for (let j = 0; j < entries.length; j++) {
      if (entries[i] + entries[j] === 2020) {
        return entries[i] * entries[j]
      }
    }
  }
}

const reportRepairPart2 = entries => {
  for (let i = 0; i < entries.length; i++) {
    for (let j = 0; j < entries.length; j++) {
      for (let k = 0; k < entries.length; k++) {
        if (entries[i] + entries[j] + entries[k] === 2020) {
          return entries[i] * entries[j] * entries[k]
        }
      }
    }
  }
}

export { reportRepair, reportRepairPart2 }
