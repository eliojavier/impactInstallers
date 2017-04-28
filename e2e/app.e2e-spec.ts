import { ImpactInstallersPage } from './app.po';

describe('impact-installers App', () => {
  let page: ImpactInstallersPage;

  beforeEach(() => {
    page = new ImpactInstallersPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
