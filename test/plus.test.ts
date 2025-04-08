function testConcat(len: number) {
  return {
    '【+=】'() {
      let str = '';
      for (let i = 0; i < len; i += 2) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        str += String(i);
      }
    },

    '【join】'() {
      const array: string[] = [];
      for (let i = 0; i < len; i += 2) {
        array.push(String(i));
      }
      array.join('');
    },

    '【sequence】'() {
      const array: string[] = [];
      for (let i = 0; i < len; i += 2) {
        array[array.length + 1] = String(i);
      }
      array.join('');
    }
  };
}

// 测试 【拼接】
export default [
  testConcat(1000),
  testConcat(100),
  testConcat(50)
];
