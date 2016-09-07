import { AWorkbookPage } from './app.po';

describe('a-workbook App', function() {
  let page: AWorkbookPage;

  beforeEach(() => {
    page = new AWorkbookPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
