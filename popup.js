document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const statusDiv = document.getElementById('status');
    const autoRefreshCheckbox = document.getElementById('autoRefresh');
    const refreshIntervalGroup = document.getElementById('refreshIntervalGroup');

    // Load saved settings
    chrome.storage.local.get(['scrollPixel', 'scrollTime', 'autoRefresh', 'refreshInterval', 'isRunning'], (result) => {
        if (result.scrollPixel) document.getElementById('scrollPixel').value = result.scrollPixel;
        if (result.scrollTime) document.getElementById('scrollTime').value = result.scrollTime;
        if (result.refreshInterval) document.getElementById('refreshInterval').value = result.refreshInterval;
        
        if (result.autoRefresh) {
            autoRefreshCheckbox.checked = true;
            refreshIntervalGroup.classList.remove('hidden');
        }

        updateButtons(result.isRunning);
    });

    // Toggle refresh interval input
    autoRefreshCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            refreshIntervalGroup.classList.remove('hidden');
        } else {
            refreshIntervalGroup.classList.add('hidden');
        }
        saveSettings();
    });

    // Save settings on input change
    ['scrollPixel', 'scrollTime', 'refreshInterval'].forEach(id => {
        document.getElementById(id).addEventListener('change', saveSettings);
    });

    startBtn.addEventListener('click', () => {
        saveSettings(() => {
            chrome.runtime.sendMessage({ action: 'start' }, (response) => {
                // If message fails (e.g. no content script), we should still update UI locally if desired, 
                // but usually we want to ensure the tab is ready.
                // For now, we update UI and set storage to running.
                chrome.storage.local.set({ isRunning: true });
                updateButtons(true);
                sendMessageToActiveTab({ action: 'start' });
            });
        });
    });

    stopBtn.addEventListener('click', () => {
        chrome.storage.local.set({ isRunning: false });
        updateButtons(false);
        sendMessageToActiveTab({ action: 'stop' });
    });

    function saveSettings(callback) {
        const settings = {
            scrollPixel: parseInt(document.getElementById('scrollPixel').value),
            scrollTime: parseInt(document.getElementById('scrollTime').value),
            autoRefresh: autoRefreshCheckbox.checked,
            refreshInterval: parseInt(document.getElementById('refreshInterval').value)
        };
        chrome.storage.local.set(settings, callback);
    }

    function updateButtons(isRunning) {
        if (isRunning) {
            startBtn.disabled = true;
            stopBtn.disabled = false;
            statusDiv.textContent = 'Running...';
            statusDiv.style.color = 'green';
        } else {
            startBtn.disabled = false;
            stopBtn.disabled = true;
            statusDiv.textContent = 'Stopped';
            statusDiv.style.color = 'red';
        }
    }

    function sendMessageToActiveTab(message) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, message);
            }
        });
    }
});
