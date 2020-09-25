import { optimizeSvgString } from 'html2sketch/utils/svg';

describe('optimizeSvgString', () => {
  it('antd logo 解析', async () => {
    const input = `<svg xmlns="http://www.w3.org/2000/svg"  width="200px" height="200px" viewBox="0 0 200 200" version="1.1"><title>Group 28 Copy 5</title><desc>Created with Sketch.</desc><defs><linearGradient x1="62.1023273%" y1="0%" x2="108.19718%" y2="37.8635764%" id="linearGradient-1"><stop stop-color="#4285EB" offset="0%"></stop><stop stop-color="#2EC7FF" offset="100%"></stop></linearGradient><linearGradient x1="69.644116%" y1="0%" x2="54.0428975%" y2="108.456714%" id="linearGradient-2"><stop stop-color="#29CDFF" offset="0%"></stop><stop stop-color="#148EFF" offset="37.8600687%"></stop><stop stop-color="#0A60FF" offset="100%"></stop></linearGradient><linearGradient x1="69.6908165%" y1="-12.9743587%" x2="16.7228981%" y2="117.391248%" id="linearGradient-3"><stop stop-color="#FA816E" offset="0%"></stop><stop stop-color="#F74A5C" offset="41.472606%"></stop><stop stop-color="#F51D2C" offset="100%"></stop></linearGradient><linearGradient x1="68.1279872%" y1="-35.6905737%" x2="30.4400914%" y2="114.942679%" id="linearGradient-4"><stop stop-color="#FA8E7D" offset="0%"></stop><stop stop-color="#F74A5C" offset="51.2635191%"></stop><stop stop-color="#F51D2C" offset="100%"></stop></linearGradient></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="logo" transform="translate(-20.000000, -20.000000)"><g id="Group-28-Copy-5" transform="translate(20.000000, 20.000000)"><g id="Group-27-Copy-3"><g id="Group-25" fill-rule="nonzero"><g id="2"><path d="M91.5880863,4.17652823 L4.17996544,91.5127728 C-0.519240605,96.2081146 -0.519240605,103.791885 4.17996544,108.487227 L91.5880863,195.823472 C96.2872923,200.518814 103.877304,200.518814 108.57651,195.823472 L145.225487,159.204632 C149.433969,154.999611 149.433969,148.181924 145.225487,143.976903 C141.017005,139.771881 134.193707,139.771881 129.985225,143.976903 L102.20193,171.737352 C101.032305,172.906015 99.2571609,172.906015 98.0875359,171.737352 L28.285908,101.993122 C27.1162831,100.824459 27.1162831,99.050775 28.285908,97.8821118 L98.0875359,28.1378823 C99.2571609,26.9692191 101.032305,26.9692191 102.20193,28.1378823 L129.985225,55.8983314 C134.193707,60.1033528 141.017005,60.1033528 145.225487,55.8983314 C149.433969,51.69331 149.433969,44.8756232 145.225487,40.6706018 L108.58055,4.05574592 C103.862049,-0.537986846 96.2692618,-0.500797906 91.5880863,4.17652823 Z" id="Shape" fill="url(#linearGradient-1)"></path><path d="M91.5880863,4.17652823 L4.17996544,91.5127728 C-0.519240605,96.2081146 -0.519240605,103.791885 4.17996544,108.487227 L91.5880863,195.823472 C96.2872923,200.518814 103.877304,200.518814 108.57651,195.823472 L145.225487,159.204632 C149.433969,154.999611 149.433969,148.181924 145.225487,143.976903 C141.017005,139.771881 134.193707,139.771881 129.985225,143.976903 L102.20193,171.737352 C101.032305,172.906015 99.2571609,172.906015 98.0875359,171.737352 L28.285908,101.993122 C27.1162831,100.824459 27.1162831,99.050775 28.285908,97.8821118 L98.0875359,28.1378823 C100.999864,25.6271836 105.751642,20.541824 112.729652,19.3524487 C117.915585,18.4685261 123.585219,20.4140239 129.738554,25.1889424 C125.624663,21.0784292 118.571995,14.0340304 108.58055,4.05574592 C103.862049,-0.537986846 96.2692618,-0.500797906 91.5880863,4.17652823 Z" id="Shape" fill="url(#linearGradient-2)"></path></g><path d="M153.685633,135.854579 C157.894115,140.0596 164.717412,140.0596 168.925894,135.854579 L195.959977,108.842726 C200.659183,104.147384 200.659183,96.5636133 195.960527,91.8688194 L168.690777,64.7181159 C164.472332,60.5180858 157.646868,60.5241425 153.435895,64.7316526 C149.227413,68.936674 149.227413,75.7543607 153.435895,79.9593821 L171.854035,98.3623765 C173.02366,99.5310396 173.02366,101.304724 171.854035,102.473387 L153.685633,120.626849 C149.47715,124.83187 149.47715,131.649557 153.685633,135.854579 Z" id="Shape" fill="url(#linearGradient-3)"></path></g><ellipse id="Combined-Shape" fill="url(#linearGradient-4)" cx="100.519339" cy="100.436681" rx="23.6001926" ry="23.580786"></ellipse></g></g></g></g></svg>`;
    const output = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><linearGradient id="a" x1="62.102%" x2="108.197%" y1="0%" y2="37.864%"><stop offset="0%" stop-color="#4285EB"/><stop offset="100%" stop-color="#2EC7FF"/></linearGradient><linearGradient id="b" x1="69.644%" x2="54.043%" y1="0%" y2="108.457%"><stop offset="0%" stop-color="#29CDFF"/><stop offset="37.86%" stop-color="#148EFF"/><stop offset="100%" stop-color="#0A60FF"/></linearGradient><linearGradient id="c" x1="69.691%" x2="16.723%" y1="-12.974%" y2="117.391%"><stop offset="0%" stop-color="#FA816E"/><stop offset="41.473%" stop-color="#F74A5C"/><stop offset="100%" stop-color="#F51D2C"/></linearGradient><linearGradient id="d" x1="68.128%" x2="30.44%" y1="-35.691%" y2="114.943%"><stop offset="0%" stop-color="#FA8E7D"/><stop offset="51.264%" stop-color="#F74A5C"/><stop offset="100%" stop-color="#F51D2C"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><g fill-rule="nonzero"><path fill="url(#a)" d="M91.588 4.177L4.18 91.513a11.981 11.981 0 000 16.974l87.408 87.336a12.005 12.005 0 0016.989 0l36.648-36.618c4.209-4.205 4.209-11.023 0-15.228-4.208-4.205-11.031-4.205-15.24 0l-27.783 27.76c-1.17 1.169-2.945 1.169-4.114 0l-69.802-69.744c-1.17-1.169-1.17-2.942 0-4.11l69.802-69.745c1.17-1.169 2.944-1.169 4.114 0l27.783 27.76c4.209 4.205 11.032 4.205 15.24 0 4.209-4.205 4.209-11.022 0-15.227L108.581 4.056c-4.719-4.594-12.312-4.557-16.993.12z"/><path fill="url(#b)" d="M91.588 4.177L4.18 91.513a11.981 11.981 0 000 16.974l87.408 87.336a12.005 12.005 0 0016.989 0l36.648-36.618c4.209-4.205 4.209-11.023 0-15.228-4.208-4.205-11.031-4.205-15.24 0l-27.783 27.76c-1.17 1.169-2.945 1.169-4.114 0l-69.802-69.744c-1.17-1.169-1.17-2.942 0-4.11l69.802-69.745c2.912-2.51 7.664-7.596 14.642-8.786 5.186-.883 10.855 1.062 17.009 5.837L108.58 4.056c-4.719-4.594-12.312-4.557-16.993.12z"/><path fill="url(#c)" d="M153.686 135.855c4.208 4.205 11.031 4.205 15.24 0l27.034-27.012c4.7-4.696 4.7-12.28 0-16.974l-27.27-27.15c-4.218-4.2-11.043-4.195-15.254.013-4.209 4.205-4.209 11.022 0 15.227l18.418 18.403c1.17 1.169 1.17 2.943 0 4.111l-18.168 18.154c-4.209 4.205-4.209 11.023 0 15.228z"/></g><ellipse cx="100.519" cy="100.437" fill="url(#d)" rx="23.6" ry="23.581"/></g></svg>`;
    expect(await optimizeSvgString(input)).toBe(output);
  });
});