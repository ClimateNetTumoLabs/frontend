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
        <code className={styles.code}>{code}</code>
        <span className={styles.copyContainer}>
          {copiedStates[id] ? (
            isMobile ? (
              <FontAwesomeIcon icon={faCheck} className={styles.doneIcon} />
            ) : (
              <p className={styles.copiedText}>Copied!</p>
            )
          ) : (
            <div className={styles.copy}>
                <FontAwesomeIcon
                  icon={faCopy}
                  onClick={(e) => copyCode(e, id)}
                />
            </div>
          )}
        </span>
      </pre>
    );
  };

  return (
    <section id="commands" className={styles.section}>
      <h2 className={styles.subTitles}>{t('diy.tabs.setuptitle')}</h2>
      <div className={styles.readmeStyle}>
        <p>{t('diy.commands.image')}</p>
        <div className={styles.downloadContainer}>
          <a href="/downloads/imager_1.8.5.exe" download className={styles.downloadButton}>
            {t('diy.commands.win')}
          </a>
          <a href="/downloads/imager_1.8.5.dmg" download className={styles.downloadButton}>
            {t('diy.commands.mac')}
          </a>
          <a href="/downloads/imager_1.8.5_amd64.deb" download className={styles.downloadButton}>
            {t('diy.commands.ubun')}
          </a>
        </div>
        <p>{t('diy.commands.inst1')}<br/>
           {t('diy.commands.inst2')}<br/>
           {t('diy.commands.inst3')}
        </p>
        <p>{t('diy.commands.important')}:</p>
        <ul>
            <li><b>Choose Device:</b>{t('diy.commands.imager.rpi')}</li>
            <li><b>Choose Operating System:</b> {t('diy.commands.app.select')}<b> "Raspberry Pi OS (Legacy, 32-bit) Debian Bullseye"</b>{t('diy.commands.imager.rpi2')}</li>
            <li><b>Choose Storage:</b>{t('diy.commands.imager.storage1')}</li>
        </ul>
        <ul>
            <p>{t('diy.commands.imager.promt')}<b>"Would you like to apply OS custom settings?"</b>{t('diy.commands.imager.follow')}<br/>
            {t('diy.commands.imager.choose')}<b> "Edit Settings"</b>:</p>
                <li><b>Username:</b>{t('diy.commands.imager.username')}</li>
                <li><b>Password:</b>{t('diy.commands.imager.password')}</li>
                <li><b>Wireless LAN (Wi-Fi):</b>{t('diy.commands.imager.lan')}</li>
                <li><b>Services:</b>{t('diy.commands.imager.services')}</li>
        </ul>
        <p>{t('diy.commands.imager.difficult')} <a className={styles.link} href="https://www.youtube.com/watch?v=ntaXWS8Lk34" target="_blank" rel="noreferrer">{t('diy.commands.imager.video')}</a>.<br/>
        {t('diy.commands.imager.wait')}<br/>
        {t('diy.commands.imager.local')}<br/>
        {t('diy.commands.imager.network')}<code>arp-scan</code>.
        </p>

        <div className={styles.network}>
            <p>{t('diy.commands.install')}</p>
            <ol>
            <li><b>Linux:</b></li>
            <ul>
              <li>Debian/Ubuntu-based {t('diy.commands.system')}:
                <CodeBlock
                  id="debian-arp-scan"
                  code={`sudo apt update\nsudo apt install arp-scan`}
                />
              </li>
              <li>Red Hat/CentOS-based {t('diy.commands.system')}:
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
            <p>{t('diy.commands.brew')}<a className={styles.link} href="https://brew.sh/">Homebrew</a>.</p>
            <CodeBlock
              id="macos-arp-scan"
              code="brew install arp-scan"
            />
          </li>
          </ol>
          <hr></hr>
          <p>{t('diy.commands.after_install')}</p>
            <CodeBlock
              id="run-macos-arp-scan"
              code="sudo arp-scan --localnet"
            />

            <p>{t('diy.commands.appear')}
                <CodeBlock
                code="<IP address>	<MAC address>	Raspberry Pi Foundation"
            />
            <p className={styles.wrong}>{t('diy.commands.wrong')}</p>
                {t('diy.commands.correct')}</p>
            <CodeBlock
              id="ssh-command"
              code="ssh raspberry@<IP>"
            />

        <p>{t('diy.commands.congratulations')}</p>
        </div>

        <div className={styles.setup}>
        <h2>{t('diy.commands.setup')}</h2>
        <ol start="1">
          <li>
            <p>{t('diy.commands.app.vim')}</p>
            <CodeBlock
              id="install-vim"
              code={`sudo apt update\nsudo apt install vim`}
            />
          </li>

          <li>
            <p>{t('diy.commands.app.edit')}<b>/boot/config.txt</b> {t('diy.commands.app.file')}</p>
            <CodeBlock
              id="edit-config"
              code="sudo vim /boot/config.txt"
            />
            <p>{t('diy.commands.app.line')}</p>
            <CodeBlock
              id="add-config-line"
              code="dtoverlay=pi3-miniuart-bt"
            />
          </li>

          <li>
            <p>{t('diy.commands.app.port')}</p>
            <CodeBlock
              id="raspi-config"
              code="sudo raspi-config"
            />
            <p>{t('diy.commands.app.navigate')}<b>Interface Options</b>, {t('diy.commands.app.then')} <b>Serial Port</b>. {t('diy.commands.app.settings')}</p>
            <ul>
              <li>{t('diy.commands.app.promt')} "Would you like a login shell to be accessible over serial?", {t('diy.commands.app.select')} <b>No</b>.</li>
              <li>{t('diy.commands.app.promt')} "Would you like the serial port hardware to be enabled?", {t('diy.commands.app.select')} <b>Yes</b>.</li>
              <li>{t('diy.commands.app.select')} OK and Finish. <b>{t('diy.commands.app.dont')}</b> reboot {t('diy.commands.app.stage')}</li>
            </ul>
          </li>

          <li>
            <p>{t('diy.commands.app.workspace')}</p>
            <CodeBlock
              id="workspace-directory"
              code={`mkdir /home/raspberry/workspace\ncd /home/raspberry/workspace`}
            />
          </li>

          <li>
            <p>{t('diy.commands.app.clone')}</p>
            <CodeBlock
              id="git-clone"
              code={`git clone https://github.com/ClimateNetTumoLabs/raspberry_soft.git\ncd raspberry_soft/app`}
            />
          </li>

          <li>
            <p>{t('diy.commands.app.env')} <b>DEVICE_ID</b> {t('diy.commands.app.and')} <b>MQTT_BROKER_ENDPOINT</b>.<br/>
            {t('diy.commands.app.message')} <a className={styles.link}href="#request">{t('contact.title2')}</a>, {t('diy.commands.app.form')}<br/></p>
            <p className={styles.wrong}>{t('diy.commands.app.id')} </p>

            <CodeBlock
              id="env-config"
              code={`cp .env_template .env\nvim .env`}
            />
          </li>

          <li>
            <p>{t('diy.commands.app.wifi')} <b>SSID</b> {t('diy.commands.app.and')} <b>password</b> in inet_check_connect.py.</p>
            <CodeBlock
              id="inet-check-connect"
              code={`cd ../ServiceFiles/InternetCheckConnect/\nvim inet_check_connect.py`}
            />
          </li>

          <li>
            <p>{t('diy.commands.app.certificates')} (certificate.pem.crt, private.pem.key, public.pem.key, rootCA.pem) {t('diy.commands.app.machine')}<b>/home/raspberry/workspace/raspberry_soft/app/data/certificates/</b> {t('diy.commands.app.directory')}</p>
            <p>{t('diy.commands.app.include')}</p>
            <CodeBlock
              id="certificates"
              code="scp -r <folder_path>/certificates/ <username>@<IP>:/home/raspberry/workspace/raspberry_soft/app/data/"
            />
          </li>

          <li>
            <p>{t('diy.commands.app.script')}</p>
            <CodeBlock
              id="install"
              code={`cd /home/raspberry/workspace/raspberry_soft/\nchmod +x install.sh\nsudo ./install.sh`}
            />
          </li>

          <li>
            <p>Reboot {t('diy.commands.app.system')}</p>
            <CodeBlock
              id="reboot"
              code="sudo reboot"
            />
          </li>

          <li>
            <p>{t('diy.commands.app.test')} <a className={styles.link} href="#video">video</a>.<br/>
            {t('diy.commands.app.venv')}</p>
            <CodeBlock
              id="test"
              code={`cd /home/raspberry/workspace/raspberry_soft/app/\nsource venv/bin/activate\npython testing.py`}
            />
          </li>

          <li>
            <p>{t('diy.commands.app.program')}<b>ProgramAutoRun.service</b>,{t('diy.commands.app.automate')}</p>
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
