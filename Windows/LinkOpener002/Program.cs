using Microsoft.Win32;
using Newtonsoft.Json.Linq;
using System;
using System.Diagnostics;
using System.IO;
using System.Xml.Linq;

namespace LinkOpener
{
    class Program
    {
        static void Main(string[] args)
        {

            if (args.Length > 0)
            {
                string filePath = args[0];
                if (File.Exists(filePath))
                {
                    string content = File.ReadAllText(filePath);
                    try
                    {
                        JObject jsonObj = JObject.Parse(content);
                        string url = (string)jsonObj["url"];
                        Console.WriteLine("The url is:" + url);

                        if (!string.IsNullOrEmpty(url))
                        {
                            Process.Start(new ProcessStartInfo
                            {
                                FileName = url,
                                UseShellExecute = true
                            });
                        }
                        else
                        {
                            Console.WriteLine("The 'url' property is empty or null.");
                        }
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine($"An error occurred: {e.Message}");
                    }
                }
                else
                {
                    Console.WriteLine("File does not exist.");
                }
            }
            else
            {
                Console.WriteLine("No file argument provided.");
            }


            //Console.WriteLine("Press any key to exit...");
            //Console.ReadKey();
        }


    }
}
