import React, {useState} from 'react';
import styles from './Commands.module.css';
import {useTranslation} from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

function Commands() {

  const { t } = useTranslation();
  const [copiedStates, setCopiedStates] = useState({});

  function copyCode(event, id) {
    const codeElement = event.target.closest('pre').querySelector('code');
    const codeText = codeElement.innerText;

    navigator.clipboard.writeText(codeText).then(() => {
      setCopiedStates(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [id]: false }));
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy code: ', err);
    });
  }

    const CodeBlock = ({ id, code }) => (
    <pre>
      <code>{code}</code>
      <span className={styles.copyContainer}>
        {copiedStates[id] ? (
          <p className={styles.copiedText}>Copied!</p>
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

  return (

  <section id="git" className={styles.section}>
        <h2 className={styles.subTitles}>Setup Commands</h2>
        <div className={styles.readmeStyle}>
        <p>First, you'll need to download the Raspberry Pi Imager. Choose the version that matches your operating system:</p>
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
        <p>After downloading, Follow the on-screen instructions to complete the setup.</p>
        <p>Put your SD card into the adapter and connect to your machine.</p>
        <p>Open the RPI Imager and start configurations.</p>
        <p>Important:</p>
        <ul>
            <li>Ensure that the username for your Raspberry Pi is set to raspberry.</li>
            <li>The last tested and stable version for this application is <strong>Raspberry Pi OS (Legacy, 32-bit) Debian Bullseye</strong>, choose it from the Imager.</li>
            <li>Add WI-Fi Credentials in Imager.</li>
            <li>Enable the SSH Connection in Imager.</li>
        </ul>
        <p>If your facing difficulties, check out the <a href="https://www.youtube.com/watch?v=ntaXWS8Lk34" target="_blank" rel="noreferrer">video</a>.</p>
        <p>Put SD card in Raspberry Pi, and wait for 5 minutes.</p>
        <p>After that, let's find your Raspberry Pi's IP address using a network scanning tool <code>arp-scan</code></p>
        <p>1. On Linux:</p>
          <strong>Install arp-scan:</strong>
          <ul>
            <li><strong>Debian/Ubuntu-based systems:</strong>
              <CodeBlock
                id="debian-arp-scan"
                code={`sudo apt update\nsudo apt install arp-scan`}
              />
            </li>
            <li><strong>Red Hat/CentOS-based systems:</strong>
              <CodeBlock
                id="redhat-arp-scan"
                code="sudo yum install arp-scan"
              />
            </li>
            <li><strong>Fedora:</strong>
              <CodeBlock
                id="fedora-arp-scan"
                code="sudo dnf install arp-scan"
              />
            </li>
          </ul>
          <strong>Run</strong>
          <CodeBlock
            id="run-arp-scan"
            code="sudo arp-scan --localnet"
          />

          <p>2. On macOS:</p>
          <strong>Install arp-scan using Homebrew:</strong>
          <CodeBlock
            id="macos-arp-scan"
            code="brew install arp-scan"
          />
          <strong>Run</strong>
          <CodeBlock
            id="run-macos-arp-scan"
            code="sudo arp-scan --localnet"
          />

          <p>Run the command:</p>
          <CodeBlock
            id="ssh-command"
            code="ssh raspberry@<IP>"
          />

          <h2>Setting up the App</h2>
          <p>1. Install vim on your Raspberry Pi</p>
          <CodeBlock
            id="install-vim"
            code={`sudo apt update\nsudo apt install vim`}
          />

          <p>2. Edit the <strong>/boot/config.txt</strong> file:</p>
          <CodeBlock
            id="edit-config"
            code="sudo vim /boot/config.txt"
          />

          <p>Add the following line at the end of the file:</p>
          <CodeBlock
            id="add-config-line"
            code="dtoverlay=pi3-miniuart-bt"
          />

        <p>3. Enable the serial port:</p>
        <CodeBlock
            id="raspi-config"
            code="sudo raspi-config"
        />
        <p>Navigate to <strong>Interface Options</strong>, then <strong>Serial Port</strong>. Configure the settings as follows:</p>
        <ul>
            <li>When prompted "Would you like a login shell to be accessible over serial?", select <strong>No</strong>.</li>
            <li>When prompted "Would you like the serial port hardware to be enabled?", select <strong>Yes</strong>.</li>
            <li>Select OK and Finish. Do not reboot at this stage.</li>
        </ul>
        <p>4. Create a workspace directory:</p>
        <CodeBlock
            id="workspace-directory"
            code={`mkdir /home/raspberry/workspace\ncd /home/raspberry/workspace`}
        />
        <p>5. Clone the repository:</p>
        <CodeBlock
            id="git-clone"
            code={`git clone https://github.com/ClimateNetTumoLabs/raspberry_soft.git\ncd raspberry_soft/app`}
        />
        <p>6. Configure the environment variables: Copy .env_template to .env and update the values, including the DEVICE_ID and MQTT_BROKER_ENDPOINT</p>
        <CodeBlock
            id="env-config"
            code={`cp .env_template .env\nvim .env`}
        />
        <p>7. Add your WiFi credentials: Update the SSID and password in inet_check_connect.py.</p>
        <CodeBlock
            id="inet-check-connect"
            code={`cd ../ServiceFiles/InternetCheckConnect/\nvim inet_check_connect.py`}
        />
        <p>8. Copy the AWS IoT Core certificates: Copy the certificate files (certificate.pem.crt, private.pem.key, public.pem.key, rootCA.pem) from your local machine into the /home/raspberry/workspace/raspberry_soft/app/data/certificates/ directory:</p>
        <p>If you have not created certificates, navigate to <a href="#request">Request Access</a>, fill the form, and we will send you the certificates.</p>
        <CodeBlock
            id="certificates"
            code="scp -r &lt;folder_path&gt;/certificates/ &lt;username&gt;@&lt;IP&gt;:/home/raspberry/workspace/raspberry_soft/app/data/"
        />
        <p>9. Run the installation script: Ensure you are not connected via SSH, and run the installation script with sudo:</p>
        <CodeBlock
            id="install"
            code={`cd /home/raspberry/workspace/raspberry_soft/\nchmod +x install.sh\nsudo ./install.sh`}
        />
        <p>10. Reboot the system:</p>
        <CodeBlock
            id="reboot"
            code="sudo reboot"
        />
        <p>11. Test the functionality of the device: Activate the virtual environment and run the testing.py program:</p>
        <CodeBlock
            id="testing"
            code={`cd /home/raspberry/workspace/raspberry_soft/app/\nsource venv/bin/activate\npython testing.py`}
        />
        <p>12. Start the main program: Enable and start the ProgramAutoRun service, which will run continuously and start automatically on boot:</p>
        <CodeBlock
            id="systemctl"
            code={`sudo systemctl enable ProgramAutoRun.service\nsudo systemctl start ProgramAutoRun.service`}
        />
       </div>
      </section>
  )
}

export default Commands;