const { contextBridge, ipcRenderer } = require('electron');

/**
 * Expose APIs to the renderer process securely using `contextBridge`.
 */
contextBridge.exposeInMainWorld('api', {
  // Example: Send a message to the main process
  send: (channel, data) => {
    const validChannels = ['message']; // List of allowed channels
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },

  // Example: Listen for a message from the main process
  on: (channel, callback) => {
    const validChannels = ['reply', 'update']; // List of allowed channels
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
    }
  },

  // Example: Invoke a main process action and get a result
  invoke: async (channel, data) => {
    const validChannels = ['perform-action']; // List of allowed channels
    if (validChannels.includes(channel)) {
      return await ipcRenderer.invoke(channel, data);
    }
  },
});
