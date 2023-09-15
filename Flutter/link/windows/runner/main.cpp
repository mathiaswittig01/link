#include <Windows.h>

void OpenPredefinedURL() {
  ShellExecute(0, 0, L"https://mathias-wittig.com/", 0, 0, SW_SHOW);
}

int APIENTRY wWinMain(_In_ HINSTANCE hInstance,
                     _In_opt_ HINSTANCE hPrevInstance,
                     _In_ LPWSTR    lpCmdLine,
                     _In_ int       nCmdShow) {
  if (__argc > 1) {
    // Open the predefined URL regardless of what the .link file contains.
    OpenPredefinedURL();
  }
  return 0;
}
