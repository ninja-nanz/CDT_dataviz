# dataviz packages
conda create --name dataviz python=3.6
conda activate dataviz
conda install numpy
conda install pandas
conda install -c anaconda xlrd
conda install -c conda-forge jupyterlab
pip install python-Levenshtein
conda deactivate