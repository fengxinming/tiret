const len = 1000;

// 测试 【plus】
export default [{
  '【+=】'() {
    let str = '';
    for (let i = 0; i < len; i += 2) {
      // eslint-disable-next-line no-unused-vars
      str += i;
    }
  },

  '【join】'() {
    const array = [];
    for (let i = 0; i < len; i += 2) {
      array.push(i);
    }
    array.join('');
  }
}, {
  '【push】'() {
    const array = [];
    for (let i = 0; i < len; i += 2) {
      array.push(i);
    }
  },

  '【sequence】'() {
    const array = [];
    for (let i = 0; i < len; i += 2) {
      array[array.length + 1] = i;
    }
  }
}];
