#include <windows.h>
#include <shellapi.h>
#include <iostream>
#include <string>

int APIENTRY WinMain(_In_ HINSTANCE hInstance,
                     _In_opt_ HINSTANCE hPrevInstance,
                     _In_ LPSTR    lpCmdLine,
                     _In_ int       nCmdShow) {

  // Capture the command line arguments
  std::string cmdLine(lpCmdLine);

  // Check if a .link file was passed as an argument
  if (cmdLine.find(".link") != std::string::npos) {
    // Open the URL using the default web browser
    ShellExecute(NULL, L"open", L"https://mathias-wittig.com", NULL, NULL, SW_SHOWNORMAL);
    return 0;  // Exit if a .link file was handled
  }
  
  // Your usual Flutter Windows initialization code and main loop would go here.
  // ...

  return 0;
}
