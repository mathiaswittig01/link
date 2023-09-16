using Microsoft.Win32;
using System;
using System.Diagnostics;
using System.IO;

namespace LinkOpener
{
    class Program
    {
        static void Main(string[] args)
        {
            // Register the file extension if not already registered.
            //RegisterFileExtension();

            Console.WriteLine("Hello");

            // Keep the console window open until a key is pressed.
            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }

        private static void RegisterFileExtension()
        {
            string exePath = System.Reflection.Assembly.GetExecutingAssembly().Location;
            string extension = ".link";
            string fileType = "LinkOpener";
            string description = "Link Opener";

            // Check if the file extension is already registered.
            RegistryKey key = Registry.ClassesRoot.OpenSubKey(extension);
            if (key != null && key.GetValue(null) as string == fileType)
            {
                // File extension is already registered.
                return;
            }
            key?.Close();

            // Register the file extension.
            key = Registry.ClassesRoot.CreateSubKey(extension);
            key.SetValue("", fileType);
            key.Close();

            key = Registry.ClassesRoot.CreateSubKey(fileType);
            key.SetValue("", description);
            key.Close();

            key = Registry.ClassesRoot.CreateSubKey($@"{fileType}\shell\open\command");
            key.SetValue("", $@"""{exePath}"" ""%1""");
            key.Close();
        }


    }
}
