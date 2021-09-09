# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.191.1/containers/javascript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 16, 14, 12
ARG VARIANT="16-buster"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && apt-get upgrade -y && export DEBIAN_FRONTEND=noninteractive

# Install Cypress dependecies
RUN apt-get -y install --no-install-recommends \
    libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

# Install Chinese font
RUN apt-get -qqy update \
    && apt-get -qqy --no-install-recommends install fonts-wqy-zenhei \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get -qyy clean

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node modules
# RUN su node -c "npm install -g <your-package-list-here>"
