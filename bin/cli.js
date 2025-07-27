#!/usr/bin/env node

const Prompts = require("prompts")
const path = require("node:path")
const fs = require("fs-extra");
const nanospinner = require("nanospinner")

const printBold = (txt) => console.log(`\x1b[1m${txt}\x1b[0m`)

async function scaffhold(framework, projectName) {
  const srcDir = path.join(__dirname, "../Frameworks", framework);
  const destDir = path.resolve(process.cwd(), projectName);

  const spinner = nanospinner.createSpinner("Loading...").start()

  try {
    setTimeout(async () => {
        await fs.copy(srcDir, destDir, {
        errorOnExist: false,
        overwrite: true
    }).then(() => {
        spinner.success("Loaded Successfully!")
        console.log()
        console.log("---------------------------------")
        console.log()
        printBold("To set it up execute these following commands: ")
        console.log()
        console.log(`cd ${projectName}`)
        console.log()
        console.log(`npm install`)
        console.log()
        console.log(`npm run dev`)
        console.log()
        console.log("---------------------------------")
    })
    }, 5000)
  } catch (err) {
    spinner.error("Failed to scaffhold!")
    console.error("Failed to scaffold:", err);
  }
}

(async() => {
    printBold("Welcome to Krio Scaffholdings!")
    const Responses = await Prompts([
        {
            type: "text",
            name: "project_name",
            message: "Project Name",
            default: "krio-scaff-default"
        },
        {
            type: "select",
            name: "framework",
            message: "Choose a Framework:",
            choices: [
                { title: "Express (Recommended)", value: "Express"},
                { title: "Polka", value: "Polka"},
                { title: "Connect", value: "Connect"},
                { title: "Restana", value: "Restana"},
                { title: "TurboHttp", value: "TurboHttp"}
            ],
        }    
    ], {
        onCancel: () => {
            console.log("Process cancelled. Exiting...")
            process.exit(0)
        }
    })

    printBold("Sweet! Scaffholding process has now started!")
    scaffhold(Responses.framework, Responses.project_name)
})()