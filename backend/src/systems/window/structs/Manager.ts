type BasicWindowManager = {
  open: () => void;
  close: () => void;
};

export type MainWindowManager = BasicWindowManager;

export type PerferecesWindowManager = BasicWindowManager;

export class WindowManager {
  /**
   *
   */
  public main?: MainWindowManager;

  /**
   *
   */
  public preferences?: PerferecesWindowManager;

  /**
   *
   */
  public setMainWindow(mainWindowManager: MainWindowManager): void {
    this.main = mainWindowManager;
  }

  /**
   *
   * @param preferencesWindowManager
   */
  public setPreferencesWindow(preferencesWindowManager: PerferecesWindowManager): void {
    this.preferences = preferencesWindowManager;
  }
}

export const windowManager = new WindowManager();
