# CSV Annotations File Generator

This program will help you to generate a boilerplate of your final csv files that you will use to make annotation easily using wikidata and foodon. 🔥🔥


## Pre-requisites

This program is writen using **JavaScript** with **Nodejs** runtime environment. So you need to install it first.

- Install [NodeJs here](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04 "Install Node")


## Prepare the program

Assuming that you have already clone the repository on your local machine, you need to install some dependancies first before trying to run the program.

To install dependancies, you need to open the folder of the program into a terminal and run the following command:

using **npm**

```bash
npm install
```

using **yarn** 

```bash
yarn install
```

After that, all dependancies of this program will be installed. 😊


## Description

Let's describe the architecture of the project.

- **Dataset folder**: This folder will contain all your clean files. The name of these files is very important, so make sure that the name has not been modified during your cleaning process. (example: `KNSR2190_1.csv` is a good name)
- **Output folder**: This folder will contain your final **cea** and **cta** files for both `wikidata` and `foodon`. Inside this folder, you have to make sure that there are two other folder with names `wikidata` and `foodon`, otherwise the program will crash.
- **main.js file**: It is the main program, it's that file that we'll execute.


## Usage

Now let's start... 😎

- Add your **clean files** into the `dataset` folder.
- Open the terminal and place yourself at the root of the project.
- Execute the command below to launch the program and generate your cea and cta files for both wikidata and foodon.

  ```bash
  node main.js
  ```
- Now look inside the `ouput/wikidata` and `output/foodon` folders, you will see your **cea** and **cta** files. 🤩🤩🤩🤩 magic
- Congratulation, you did it. 🥳🤩
