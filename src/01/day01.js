const reportRepair = entries => {
  for (let i = 0; i < entries.length; i++) {
    for (let j = 0; j <entries.length; j++) {
      if(entries[i] + entries[j] === 2020){
        return entries[i] * entries[j]
      }
    }
  }
}

export { reportRepair }
