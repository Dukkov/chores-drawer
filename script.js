document.getElementById('drawButton').addEventListener('click', () => {
  const weight1 = parseInt(document.getElementById('weight1').value);
  const weight2 = parseInt(document.getElementById('weight2').value);

  const names = [
    { name: 'Dukov', weight: weight1 },
    { name: 'Sparrow', weight: weight2 }
  ];

  const loser = drawer(names);
  document.getElementById(
    'resultText'
  ).innerText = `${loser}님, 당첨을 축하합니다 ^.^`;

  // Run the test and show the results
  const testResults = drawerTester(names);
  document.getElementById('testResultText').innerText = testResults;

  showModal();
});

function drawer(arr) {
  const totalWeight = arr.reduce((total, item) => total + item.weight, 0);
  let randomThreshold = Math.random() * totalWeight;

  for (let item of arr) {
    randomThreshold -= item.weight;
    if (randomThreshold < 0) {
      return item.name;
    }
  }
  return null;
}

function drawerTester(arr) {
  let counts = { Dukov: 0, Sparrow: 0 };

  for (let i = 0; i < 10000; i++) {
    counts[drawer(arr)]++;
  }

  const minOdd = ((counts['Dukov'] / 10000) * 100).toFixed(2);
  const hunOdd = ((counts['Sparrow'] / 10000) * 100).toFixed(2);

  return `추첨기 주작 테스트 결과: Dukov: ${counts['Dukov']}회, ${minOdd}%. Sparrow: ${counts['Sparrow']}회, ${hunOdd}%.`;
}

function showModal() {
  const modal = document.getElementById('resultModal');
  modal.classList.remove('hidden');

  document.getElementsByClassName('close')[0].onclick = () => {
    modal.classList.add('hidden');
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.classList.add('hidden');
    }
  };
}
