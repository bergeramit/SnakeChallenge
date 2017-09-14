

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function demo() {
    console.log('Taking a break...');
    await sleep(1000);
    console.log('one second later');
  }

  //demo();




