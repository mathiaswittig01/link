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

            // Open the URL in the default web browser
            Process.Start(new ProcessStartInfo
            {
                FileName = "https://mathias-wittig.com/",
                UseShellExecute = true
            });


            // Keep the console window open until a key is pressed.
            //Console.WriteLine("Press any key to exit...");
            //Console.ReadKey();
        }


    }
}
