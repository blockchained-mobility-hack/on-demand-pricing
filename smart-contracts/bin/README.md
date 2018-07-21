1. `purge-all-containers.bash` - it purges all the local docker containers, if any. This script can be run from any location.
2. `purge-all-networks.bash` - it purges all the docker networks, if any.  This script can be run from any location.
3. `purge-all` - it chains together the `purge-all-containers.bash` and
 the `purge-all-networks.bash` scripts.  This script can be run from any location.
4. `solium-report.bash` - analyze your contracts and prints a report with all
the code-style violations. This script must run in this directory.
5. `solium-fix-contracts.bash` - analyze your contracts and if it finds
 code-style violations it fix them, this involves `changes` in your contracts files. This script must run in this directory.
6. `solium-fix-commit-contracts.bash` - same as the `solium-fix-contracts.bash` with the difference that the changes are committed (in git).  
7. `start-ganacle-cli-docker.bash` - starts the [](https://github.com/trufflesuite/ganache-cli) as docker container.  This script can be run from any location.
