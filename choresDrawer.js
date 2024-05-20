//  패배자 추첨 함수
const drawer = (arr) => {
  const totalWeight = arr.reduce((total, item) => total + item.weight, 0);
  let randomThreshold = Math.random() * totalWeight; // Random number within the range of total weight

  for (let item of arr) {
    randomThreshold -= item.weight; // Decrease the randomThreshold by the item's weight
    if (randomThreshold < 0) {
      return item.name; // Return the name of the item if randomThreshold goes below zero
    }
  }
  return null; // Return null if no item is selected (should not happen if weights are set correctly)
};

//  추첨기 주작 체크용 함수
const drawerTester = (arr) => {
  let counts = { 상민: 0, 경훈: 0 };

  for (let i = 0; i < 10000; i++) {
    counts[drawer(names)]++;
  }

  const minOdd = ((counts['상민'] / 10000) * 100).toFixed(2);
  const hunOdd = ((counts['경훈'] / 10000) * 100).toFixed(2);

  console.log('추첨기 주작 테스트 결과');
  console.log(
    `상민: ${counts['상민']}회, ${minOdd}%. 경훈: ${counts['경훈']}회, ${hunOdd}%.`
  );
};

//  명령줄 인수로 가중치 입력받음
const names = [
  { name: '상민', weight: parseInt(process.argv[2]) },
  { name: '경훈', weight: parseInt(process.argv[3]) }
];

drawerTester(names);

const loser = drawer(names);

console.log(`${loser}님, 당첨을 축하합니다 ^.^`);
