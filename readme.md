# Infinite Scroll & Auto Refresh Chrome Extension

A powerful and lightweight Chrome extension designed to automate scrolling and page refreshing. Perfect for monitoring news feeds, social media timelines, or any dynamic content that requires continuous interaction.

## Features

- **Infinite Scrolling**: Automatically scroll down pages with customizable speed and smoothness.
- **Auto Refresh**: Periodically reload the page to check for new content.
- **Smart Pause**: Pause scrolling instantly by clicking anywhere on the page (resumes automatically after 5 seconds).
- **Keyboard Controls**:
  - `ESC`: Stop scrolling immediately.
  - `ENTER`: Resume scrolling.
- **Configurable Settings**:
  - Scroll Step (Pixels)
  - Scroll Interval (Milliseconds)
  - Auto Refresh Interval (Seconds)

## Installation

1. Clone or download this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Toggle **Developer mode** in the top right corner.
4. Click **Load unpacked** in the top left corner.
5. Select the `chrome_extension` directory from the downloaded files.

## Usage

1. Navigate to any scrollable webpage.
2. Click the extension icon in the Chrome toolbar.
3. Adjust the **Scroll Pixel** and **Scroll Time** settings if needed (Default: 2px / 1ms).
4. Optionally, enable **Auto Refresh** and set the interval.
5. Click **Start** to begin automation.

### Controls during operation
- **Mouse Click**: Pauses scrolling for 5 seconds.
- **ESC Key**: Stops operation completely.
- **ENTER Key**: Resumes operation if stopped.

## Configuration

| Setting | Default | Description |
|Col | Col | Col|
|--- | --- | ---|
| **Scroll Pixel** | 2px | The distance in pixels to scroll in each step. |
| **Scroll Time** | 1ms | The time interval between scroll steps. Lower values mean smoother, faster scrolling. |
| **Auto Refresh** | Disabled | If enabled, the page will reload automatically. |
| **Refresh Interval** | 60s | Time in seconds before the page reloads (if Auto Refresh is enabled). |

## License

This project is open source and available under the [MIT License](LICENSE).