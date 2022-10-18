// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Creates object representing an organism called P Aequor
const pAequorFactory = (specimanNum, dna) => {
  return {
    specimanNum: specimanNum,
    dna: dna,

    mutate(){
      let selectedBaseIndex = Math.floor(Math.random()*15);
      console.log('The selected Base was ' + dna[selectedBaseIndex] + ' at index of ' + selectedBaseIndex);
      let newBase = '';
      do {
        newBase = returnRandBase();
      } while (dna[selectedBaseIndex] === newBase);
      this.dna[selectedBaseIndex] = newBase;
      console.log('The selected Base is now ' + newBase);
    },

    compareDNA(speciman){
      let matchingBaseCount = 0;
      for(i = 0; i < speciman.dna.length; i++){
        if (this.dna[i] === speciman.dna[i]){
          matchingBaseCount++;
        }
      }
      const percentSimilar = (matchingBaseCount/speciman.dna.length)*100; 
      console.log('Speciman #' + this.specimanNum + ' and speciman #' + speciman.specimanNum + ' have ' + percentSimilar + '% DNA in common');
    },

    //P. aequor have a higher chance of survival if their DNA is made up of at least 60% 'C' or 'G' bases.
    willLikelySurvive(){
      let CAndGCount = 0;
      for (i=0; i < this.dna.length; i++){
        if (this.dna[i] === 'C' || this.dna[i] === 'G'){
          CAndGCount++;
        }
      }
      const survivalChance = CAndGCount/this.dna.length;
      return survivalChance >= .6 ? true:false;
    }
  };
}

//Creates 30 instances of pAequor that will likely survive in their natural environment
const batch = [];
for (i = 1; batch.length < 30; i++){
  let newSpeciman = pAequorFactory(batch.length+1, mockUpStrand());
  if (newSpeciman.willLikelySurvive()){
    batch.push(newSpeciman);
  };
};
