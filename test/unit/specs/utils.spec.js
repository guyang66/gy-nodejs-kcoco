const helper = require('../../../extend/helper')
test('测试getPaginationCellText方法', () => {

  function mockPagination (total, page) {
    let allPage = Math.ceil(total / 10)
    let cellCount = Math.min(allPage, 7)
    let paginationContent = []
    let keyMap = {}
    for (let i = 0; i < allPage; i ++){
      let text = helper().getPaginationCellText(total, cellCount, page, i + 1)
      if(keyMap[text]){
        continue
      }
      keyMap[text] = text
      if(text === 'omitBack' || text === 'omitFront'){
        paginationContent.push('...')
      } else {
        paginationContent.push(text)
      }
    }
    return paginationContent
  }
  expect(mockPagination(1,0)).toStrictEqual(['1']);
  expect(mockPagination(1,1)).toStrictEqual(['1']);
  expect(mockPagination(1,2)).toStrictEqual(['1']);
  expect(mockPagination(9,1)).toStrictEqual(['1']);
  expect(mockPagination(10,1)).toStrictEqual(['1']);
  expect(mockPagination(11,1)).toStrictEqual(['1','2']);
  expect(mockPagination(11,2)).toStrictEqual(['1','2']);

  expect(mockPagination(19,2)).toStrictEqual(['1','2']);
  expect(mockPagination(20,2)).toStrictEqual(['1','2']);
  expect(mockPagination(21,3)).toStrictEqual(['1','2','3']);
  expect(mockPagination(31,3)).toStrictEqual(['1','2','3','4']);
  expect(mockPagination(43,3)).toStrictEqual(['1','2','3','4','5']);
  expect(mockPagination(58,3)).toStrictEqual(['1','2','3','4','5','6']);
  expect(mockPagination(61,3)).toStrictEqual(['1','2','3','4','5','6','7']);
  expect(mockPagination(70,5)).toStrictEqual(['1','2','3','4','5','6','7']);

  expect(mockPagination(71,1)).toStrictEqual(['1','2','3','4','5','...','8']);
  expect(mockPagination(71,2)).toStrictEqual(['1','2','3','4','5','...','8']);
  expect(mockPagination(71,3)).toStrictEqual(['1','2','3','4','5','...','8']);
  expect(mockPagination(71,4)).toStrictEqual(['1','2','3','4','5','...','8']);
  expect(mockPagination(71,5)).toStrictEqual(['1','...','4','5','6','7','8']);
  expect(mockPagination(71,6)).toStrictEqual(['1','...','4','5','6','7','8']);
  expect(mockPagination(71,7)).toStrictEqual(['1','...','4','5','6','7','8']);
  expect(mockPagination(71,8)).toStrictEqual(['1','...','4','5','6','7','8']);

  expect(mockPagination(81,1)).toStrictEqual(['1','2','3','4','5','...','9']);
  expect(mockPagination(81,2)).toStrictEqual(['1','2','3','4','5','...','9']);
  expect(mockPagination(81,3)).toStrictEqual(['1','2','3','4','5','...','9']);
  expect(mockPagination(81,4)).toStrictEqual(['1','2','3','4','5','...','9']);
  expect(mockPagination(81,5)).toStrictEqual(['1','...','4','5','6','...','9']);
  expect(mockPagination(81,6)).toStrictEqual(['1','...','5','6','7','8','9']);
  expect(mockPagination(81,7)).toStrictEqual(['1','...','5','6','7','8','9']);
  expect(mockPagination(81,8)).toStrictEqual(['1','...','5','6','7','8','9']);
  expect(mockPagination(81,9)).toStrictEqual(['1','...','5','6','7','8','9']);

  expect(mockPagination(111,1)).toStrictEqual(['1','2','3','4','5','...','12']);
  expect(mockPagination(111,2)).toStrictEqual(['1','2','3','4','5','...','12']);
  expect(mockPagination(111,3)).toStrictEqual(['1','2','3','4','5','...','12']);
  expect(mockPagination(111,4)).toStrictEqual(['1','2','3','4','5','...','12']);

  expect(mockPagination(111,5)).toStrictEqual(['1','...','4','5','6','...','12']);
  expect(mockPagination(111,6)).toStrictEqual(['1','...','5','6','7','...','12']);
  expect(mockPagination(111,7)).toStrictEqual(['1','...','6','7','8','...','12']);
  expect(mockPagination(111,8)).toStrictEqual(['1','...','7','8','9','...','12']);
  expect(mockPagination(111,9)).toStrictEqual(['1','...','8','9','10','11','12']);

  expect(mockPagination(111,10)).toStrictEqual(['1','...','8','9','10','11','12']);
  expect(mockPagination(111,11)).toStrictEqual(['1','...','8','9','10','11','12']);
  expect(mockPagination(111,12)).toStrictEqual(['1','...','8','9','10','11','12']);
});
