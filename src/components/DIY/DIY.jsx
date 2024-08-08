import React from 'react';
import styles from './DIY.module.css';
import Contact from '../Contact/Contact.jsx';
import {useTranslation} from "react-i18next";

function DIY() {

  const {t} = useTranslation();

  return (
    <div className={styles.app}>
        <h1>{t('diy.title')}</h1>
        <p className={styles.guideSection}>{t('guide.future')}</p>
      <div className={styles.guideSection}>
        <h2 className={styles.guideTitle}>Benefits of making your own ClimateNet Device</h2>
        <h3 className={styles.guideSubTitle}>{t('guide.benefit.project.title')}</h3>
        <ul>
          <li>{t('guide.benefit.project.customization')}</li>
          <li>{t('guide.benefit.project.data')}</li>
        </ul>
        <h3 className={styles.guideSubTitle}>{t('guide.benefit.user.title')}</h3>
        <ul>
          <li>{t('guide.benefit.user.learning')}</li>
          <li>{t('guide.benefit.user.cost')}</li>
          <li>{t('guide.benefit.user.data')}</li>
        </ul>
      </div>

      <section id="cost" className={styles.titles}>
        <h2>Cost of Device</h2>
        <p>The device will cost approximately <code>$280</code></p>
      </section>

      <section id="materials" className={styles.section}>
        <h2 className={styles.subTitles}>Materials</h2>
        <div className={styles.iframeContainer}>
          <iframe
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTkuyOQ-IsJ_mVSOgXvKZAJk5bNVHLsC5Zw0wZY_nWIHIX1n6U_zZaM9t64Xfaw17XiasjLBShyeAHi/pubhtml?gid=0&single=true"
            className={styles.iframe}
            title="Materials List"
          ></iframe>
        </div>
      </section>

      <section id="tools" className={styles.section}>
        <h2 className={styles.subTitles}>Tools</h2>
        <div className={styles.iframeContainer}>
          <iframe
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT4fWMNatW1r2VK-2rD61vt8-a2fsc_qi0mSBlPrZ84HOYQPQ69zXzKOY7H9fyOknqrfhFS2uKyTIJX/pubhtml?gid=0&single=true"
            className={styles.iframe}
            title="Tools List"
          ></iframe>
        </div>
      </section>

      <section id="videos" className={styles.section}>
        <h2 className={styles.subTitles}>Videos of Assembling</h2>
        <div className={styles.videos}>
          <iframe src="https://www.youtube.com/embed/example1" title="Video 1"></iframe>
          <iframe src="https://www.youtube.com/embed/example2" title="Video 2"></iframe>
          <iframe src="https://www.youtube.com/embed/example2" title="Video 2"></iframe>
          <iframe src="https://www.youtube.com/embed/example2" title="Video 2"></iframe>
        </div>
      </section>

      <section id="git" className={styles.section}>
        <h2 className={styles.subTitles}>Setup Commands</h2>
        <div className={styles.readmeStyle}>
        <p>First, you'll need to download the Raspberry Pi Imager. Choose the version that matches your operating system:</p>
        <div className={styles.downloadContainer}>
          <a href="/downloads/imager_1.8.5.exe" download className={styles.downloadButton}>
            <button className={styles.downloadButton}>
              Download for Windows
            </button>
          </a>
          <a href="/downloads/imager_1.8.5.dmg" download className={styles.downloadButton}>
            <button className={styles.downloadButton}>
              Download for macOS
            </button>
          </a>
          <a href="/downloads/imager_1.8.5_amd64.deb" download className={styles.downloadButton}>
            <button className={styles.downloadButton}>
              Download for Ubuntu
            </button>
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
                    <pre>
                        <code>
                            sudo apt update{"\n"}
                            sudo apt install arp-scan{"\n"}
                        </code>
                    </pre>
                </li>
                <li><strong>Red Hat/CentOS-based systems:</strong>
                    <pre><code>sudo yum install arp-scan</code></pre>
                </li>
                <li><strong>Fedora:</strong>
                    <pre><code>sudo dnf install arp-scan</code></pre>
                </li>
            </ul>
        <strong>Run</strong>
                    <pre>
                        <code>
                            sudo arp-scan --localnet
                        </code>
                    </pre>

    <p>2. On macOS:</p>
        <strong>Install arp-scan using Homebrew:</strong>
            <ul>
                <li>If you don’t have Homebrew installed, you can install it by following instructions from <a href="https://brew.sh/" target="_blank"  rel="noreferrer">Homebrew's website</a>.</li>
                <li>Then, install arp-scan:
                    <pre>
                        <code>
                            brew install arp-scan
                        </code>
                    </pre>
                </li>
            </ul>
        <strong>Run</strong>
                    <pre>
                        <code>
                            sudo arp-scan --localnet
                        </code>
                    </pre>
        <p>After the command is executed, you will see all devices in your network, find Raspberry Pi and select the IP address.</p>
        <p>Run the command:</p>
        <pre>
          <code>
                ssh raspberry@&lt;IP&gt;
          </code>
        </pre>
        <p>Now you are connected to your Raspberry Pi</p>
        <h2>Setting up the App</h2>
        <p>1. Install vim on your Raspberry Pi</p>
        <pre>
          <code>
            sudo apt update{"\n"}
            sudo apt install vim{"\n"}
          </code>
        </pre>
        <p>2. Edit the <strong>/boot/config.txt</strong> file:</p>
        <pre>
          <code>
            sudo vim /boot/config.txt{"\n"}
          </code>
        </pre>
        <p>Add the following line at the end of the file:</p>
        <pre>
          <code>
            dtoverlay=pi3-miniuart-bt{"\n"}
          </code>
        </pre>
        <p>3. Enable the serial port:</p>
        <pre>
          <code>
            sudo raspi-config{"\n"}
          </code>
        </pre>
        <p>Navigate to <strong>Interface Options</strong>, then <strong>Serial Port</strong>. Configure the settings as follows:</p>
        <ul>
            <li>When prompted "Would you like a login shell to be accessible over serial?", select <strong>No</strong>.</li>
            <li>When prompted "Would you like the serial port hardware to be enabled?", select <strong>Yes</strong>.</li>
            <li>Select OK and Finish. Do not reboot at this stage.</li>
        </ul>
        <p>4. Create a workspace directory:</p>
        <pre>
            <code>
                mkdir /home/raspberry/workspace{"\n"}
                cd /home/raspberry/workspace{"\n"}
            </code>
        </pre>
        <p>5. Clone the repository:</p>
        <pre>
            <code>
                git clone https://github.com/ClimateNetTumoLabs/raspberry_soft.git{"\n"}
                cd raspberry_soft/app{"\n"}
            </code>
        </pre>
        <p>6. Configure the environment variables: Copy .env_template to .env and update the values, including the DEVICE_ID and MQTT_BROKER_ENDPOINT</p>
        <pre>
            <code>
                cp .env_template .env{"\n"}
                vim .env{"\n"}
            </code>
        </pre>
        <p>7. Add your WiFi credentials: Update the SSID and password in inet_check_connect.py.</p>
         <pre>
             <code>
                cd ../ServiceFiles/InternetCheckConnect/{"\n"}
                vim inet_check_connect.py{"\n"}
             </code>
        </pre>
        <p>8. Copy the AWS IoT Core certificates: Copy the certificate files (certificate.pem.crt, private.pem.key, public.pem.key, rootCA.pem) from your local machine into the /home/raspberry/workspace/raspberry_soft/app/data/certificates/ directory:</p>
        <p>If you have not created certificates, navigate to <strong>Contacts</strong>, fill the form, choose the Subject <strong>Technical Support</strong> and we will send you the certificates.</p>
        <pre>
            <code>
                scp -r &lt;folder_path&gt;/certificates/ &lt;username&gt;@&lt;IP&gt;:/home/raspberry/workspace/raspberry_soft/app/data/
            </code>
        </pre>
        <p>9. Run the installation script: Ensure you are not connected via SSH, and run the installation script with sudo:</p>
        <pre>
            <code>
                cd /home/raspberry/workspace/raspberry_soft/{"\n"}
                chmod +x install.sh{"\n"}
                sudo ./install.sh{"\n"}
            </code>
        </pre>
        <p>10. Reboot the system:</p>
            <pre>
                <code>
                    sudo reboot
                </code>
            </pre>
        <p>11. Test the functionality of the device: Activate the virtual environment and run the testing.py program:</p>
        <pre>
            <code>
                cd /home/raspberry/workspace/raspberry_soft/app/{"\n"}
                source venv/bin/activate{"\n"}
                python testing.py{"\n"}
            </code>
        </pre>
        <p>12. Start the main program: Enable and start the ProgramAutoRun service, which will run continuously and start automatically on boot:</p>
        <pre>
            <code>
                sudo systemctl enable ProgramAutoRun.service{"\n"}
                sudo systemctl start ProgramAutoRun.service{"\n"}
            </code>
        </pre>
       </div>
      </section>

      <section id="contact" className={styles.section}>
        <Contact className={styles.subTitles}/>
      </section>
    </div>
  );
}

export default DIY;
