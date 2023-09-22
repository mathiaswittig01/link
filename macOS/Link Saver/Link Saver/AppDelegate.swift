//
//  AppDelegate.swift
//  Link Saver
//
//  Created by Mathias Wittig on 18.09.23.
//

import Foundation

import Cocoa

class AppDelegate: NSObject, NSApplicationDelegate {
    func application(_ sender: NSApplication, openFile filename: String) -> Bool {
        print("File opened:", filename)
        // Your logic here
        return true
    }
}
