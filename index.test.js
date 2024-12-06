const Index = require('./index.js')



test('checks if adding a message produces the correct message list', () => {
  const resp = {
    send: (sent) => {
    }
  }

  Index.create_message({
    author: {
      username: "Arbor"
    },
    content: "hii"
  });
  
  expect(Index.get_messages({}, resp)).toBe("\nArbor|>hii");
})

test('checks if adding two messages produces the correct message list', () => {
  const resp = {
    send: (sent) => {
    }
  }

  Index.create_message({
    author: {
      username: "Arbor"
    },
    content: "hii"
  });
  
  Index.create_message({
    author: {
      username: "Arbor"
    },
    content: "hii2"
  });
  
  expect(Index.get_messages({}, resp)).toBe("Arbor|>hii\nArbor|>hii2");
})
