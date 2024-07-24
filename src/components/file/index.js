const pickerOpts = {
  types: [
    {
      description: "esphome display configuration",
      accept: {
        "text/*": [".json", ".edc"],
      },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
  startIn: "documents",
};

const saveOpts = {
  startIn: "documents",
  suggestedName: "Configuration.edc",
  types: [
    {
      description: "esphome display configuration",
      accept: { "text/json": [".json", ".edc"] },
    },
  ],
};

function OpenFile() {
  return new Promise((resolve, reject) => {
    window.showOpenFilePicker(pickerOpts).then(
      (data) =>
        data[0]
          .getFile()
          .then((file) => file.text().then((context) => resolve(context))),
      (handleRejectedA) => reject(handleRejectedA)
    );
  });
}

async function verifyPermission(fileHandle, readWrite) {
  const options = {};
  if (readWrite) {
    options.mode = "readwrite";
  }
  // Check if permission was already granted. If so, return true.
  if ((await fileHandle.queryPermission(options)) === "granted") {
    return true;
  }
  // Request permission. If the user grants permission, return true.
  if ((await fileHandle.requestPermission(options)) === "granted") {
    return true;
  }
  // The user didn't grant permission, so return false.
  return false;
}

async function SaveFile(contents) {
  
    const fileHandle = await window.showSaveFilePicker(saveOpts);
    const permission = await verifyPermission(fileHandle, "readwrite");
    console.log(permission);

    const writable = await fileHandle.createWritable();

    // Write the contents of the file to the stream.
    await writable.write(contents);

    // Close the file and write the contents to disk.
    await writable.close();
   
}

export { OpenFile, SaveFile };
