type Threads = {
  [key: string]:
    | {
        lastTimeVisited: string;
      }
    | undefined;
};

export default Threads;
