import React, { useState } from 'react';
import styles from './Commands.module.css';
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

function Commands() {

  const { t } = useTranslation();
  const [copiedStates, setCopiedStates] = useState({});

  function isMobileDevice() {
    return window.innerWidth <= 768; // Adjust the width as needed
  }
  
  function copyCode(event, id) {
    const codeElement = event.target.closest('pre').querySelector('code');
    const codeText = codeElement.innerText;
  
    if (navigator.clipboard && navigator.clipboard.writeText) {
      // Modern API supported
      navigator.clipboard.writeText(codeText).then(() => {
        setCopiedStates(prev => ({ ...prev, [id]: true }));
        setTimeout(() => {
          setCopiedStates(prev => ({ ...prev, [id]: false }));
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy code: ', err);
      });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = codeText;
      document.body.appendChild(textArea);
      textArea.select();
  
      try {
        document.execCommand('copy');
        setCopiedStates(prev => ({ ...prev, [id]: true }));
        setTimeout(() => {
          setCopiedStates(prev => ({ ...prev, [id]: false }));
        }, 2000);
      } catch (err) {
        console.error('Fallback: Unable to copy', err);
      }
  
      document.body.removeChild(textArea);
    }
  }

  const CodeBlock = ({ id, code }) => {
    const isMobile = isMobileDevice();
  
    return (
      <pre>
        <code>{code}</code>
        <span className={styles.copyContainer}>
          {copiedStates[id] ? (
            isMobile ? (
              <FontAwesomeIcon icon={faCheck} className={styles.doneIcon} />
            ) : (
              <p className={styles.copiedText}>Copied!</p>
            )
          ) : (
            <FontAwesomeIcon
              className={styles.copy}
              icon={faCopy}
              onClick={(e) => copyCode(e, id)}
            />
          )}
        </span>
      </pre>
    );
  };

  return (
    <section id="git" className={styles.section}>
      <h2 className={styles.subTitles}>Setup Commands</h2>
      <div className={styles.readmeStyle}>
        <p>First, you need to download the Raspberry Pi Imager. Choose the version that matches your operating system:</p>
        <div className={styles.downloadContainer}>
          <a href="/downloads/imager_1.8.5.exe" download className={styles.downloadButton}>
              Download for Windows
          </a>
          <a href="/downloads/imager_1.8.5.dmg" download className={styles.downloadButton}>
              Download for macOS
          </a>
          <a href="/downloads/imager_1.8.5_amd64.deb" download className={styles.downloadButton}>
              Download for Ubuntu
          </a>
        </div>
        <p>After downloading, Follow the on-screen instructions to complete the setup.<br/>
            Put your SD card into the adapter and connect to your machine.<br/>
            Open the RPI Imager and start configurations.
        </p>
        <p>Important:</p>
        <ul>
            <li><b>Choose Device:</b> Select the Raspberry Pi 3 as your device.</li>
            <li><b>Choose Operating System:</b> Select <b>"Raspberry Pi OS (Legacy, 32-bit) Debian Bullseye"</b> from the available options in the Raspberry Pi Imager.</li>
            <li><b>Choose Storage:</b> Select the SD card that you've inserted into the adapter.</li>
        </ul>
        <ul>
            <p>When prompted <b>"Would you like to apply OS custom settings?"</b> follow these steps:<br/>
            Choose <b>"Edit Settings"</b>:</p>
                <li><b>Username:</b> Set the username to raspberry.</li>
                <li><b>Wireless LAN (Wi-Fi):</b> Enter your SSID and password to configure your Wi-Fi connection.</li>
                <li><b>Services:</b> Enable the SSH connection by checking the corresponding box.</li>
        </ul>
        <p>If you're facing difficulties, check out the <a className={styles.link} href="https://www.youtube.com/watch?v=ntaXWS8Lk34" target="_blank" rel="noreferrer">video</a>.<br/>
        Put SD card in Raspberry Pi, and wait for 5 minutes.<br/>
        Make sure you are connected to the same network that you configured in the Imager.<br/>
        After that, let's find your Raspberry Pi's IP address using a network scanning tool <code>arp-scan</code>.
        </p>

        <div className={styles.network}>
            <p>Installing arp-scan on:</p>
            <ol>
            <li><b>Linux:</b></li>
            <ul>
              <li>Debian/Ubuntu-based systems:
                <CodeBlock
                  id="debian-arp-scan"
                  code={`sudo apt update\nsudo apt install arp-scan`}
                />
              </li>
              <li>Red Hat/CentOS-based systems:
                <CodeBlock
                  id="redhat-arp-scan"
                  code="sudo yum install arp-scan"
                />
              </li>
              <li>Fedora:
                <CodeBlock
                  id="fedora-arp-scan"
                  code="sudo dnf install arp-scan"
                />
              </li>
            </ul>

          <li>
            <p><b>MacOS:</b></p>
            <p>If you don't have brew installed, check out <a className={styles.link} href="https://brew.sh/">Homebrew</a>.</p>
            <CodeBlock
              id="macos-arp-scan"
              code="brew install arp-scan"
            />
          </li>
          </ol>
          <hr></hr>
          <p>After the installation, run:</p>
            <CodeBlock
              id="run-macos-arp-scan"
              code="sudo arp-scan --localnet"
            />
            <p>If you found your Raspberry Pi in your local network, copy the IP address and run the command:</p>
            <CodeBlock
              id="ssh-command"
              code="ssh raspberry@<IP>"
            />

        <p>Congratulations, now you are connected to Raspberry Pi. It's time to set up the app.</p>
        </div>

        <div className={styles.setup}>
        <h2>Setting up the App</h2>
        <ol start="1">
          <li>
            <p>Install vim on your Raspberry Pi</p>
            <CodeBlock
              id="install-vim"
              code={`sudo apt update\nsudo apt install vim`}
            />
          </li>

          <li>
            <p>Edit the <b>/boot/config.txt</b> file:</p>
            <CodeBlock
              id="edit-config"
              code="sudo vim /boot/config.txt"
            />
            <p>Add the following line at the end of the file:</p>
            <CodeBlock
              id="add-config-line"
              code="dtoverlay=pi3-miniuart-bt"
            />
          </li>

          <li>
            <p>Enable the serial port:</p>
            <CodeBlock
              id="raspi-config"
              code="sudo raspi-config"
            />
            <p>Navigate to <b>Interface Options</b>, then <b>Serial Port</b>. Configure the settings as follows:</p>
            <ul>
              <li>When prompted "Would you like a login shell to be accessible over serial?", select <b>No</b>.</li>
              <li>When prompted "Would you like the serial port hardware to be enabled?", select <b>Yes</b>.</li>
              <li>Select OK and Finish. <b>Do not</b> reboot at this stage.</li>
            </ul>
          </li>

          <li>
            <p>Create a workspace directory:</p>
            <CodeBlock
              id="workspace-directory"
              code={`mkdir /home/raspberry/workspace\ncd /home/raspberry/workspace`}
            />
          </li>

          <li>
            <p>Clone the repository:</p>
            <CodeBlock
              id="git-clone"
              code={`git clone https://github.com/ClimateNetTumoLabs/raspberry_soft.git\ncd raspberry_soft/app`}
            />
          </li>

          <li>
            <p>Configure the environment variables: Copy .env_template to .env and update the values, including the <b>DEVICE_ID</b> and <b>MQTT_BROKER_ENDPOINT</b></p>
            <CodeBlock
              id="env-config"
              code={`cp .env_template .env\nvim .env`}
            />
          </li>

          <li>
            <p>Add your WiFi credentials: Update the <b>SSID</b> and <b>password</b> in inet_check_connect.py.</p>
            <CodeBlock
              id="inet-check-connect"
              code={`cd ../ServiceFiles/InternetCheckConnect/\nvim inet_check_connect.py`}
            />
          </li>

          <li>
            <p>Copy the AWS IoT Core certificates: Copy the certificate files (certificate.pem.crt, private.pem.key, public.pem.key, rootCA.pem) from your local machine into the <b>/home/raspberry/workspace/raspberry_soft/app/data/certificates/</b> directory:</p>
            <p>If you do not have certificates, navigate to <a className={styles.link} href="#request">Request Access</a>, fill the form, and we will send you the certificates.</p>
            <CodeBlock
              id="certificates"
              code="scp -r &lt;folder_path&gt;/certificates/ &lt;username&gt;@&lt;IP&gt;:/home/raspberry/workspace/raspberry_soft/app/data/"
            />
          </li>

          <li>
            <p>Run the installation script: Ensure you are not connected via SSH, and run the installation script with sudo:</p>
            <CodeBlock
              id="install"
              code={`cd /home/raspberry/workspace/raspberry_soft/\nchmod +x install.sh\nsudo ./install.sh`}
            />
          </li>

          <li>
            <p>Reboot the system:</p>
            <CodeBlock
              id="reboot"
              code="sudo reboot"
            />
          </li>

          <li>
            <p>Test the functionality of the device: Activate the virtual environment and run the testing script to ensure everything is working correctly:</p>
            <CodeBlock
              id="test"
              code={`source /home/raspberry/workspace/raspberry_soft/venv/bin/activate\npython testing.py`}
            />
          </li>

          <li>
            <p>Start the main program: Enable and start the <b>ProgramAutoRun</b> service, which will run continuously and start automatically on boot:</p>
            <CodeBlock
              id="program"
              code={`sudo systemctl enable ProgramAutoRun.service\nsudo systemctl start ProgramAutoRun.service`}
            />
          </li>
        </ol>
        </div>
      </div>
    </section>
  );
}

export default Commands;
