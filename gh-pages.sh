#!/bin/bash
mkdir -p build/data
cp docs/data/MSFT.tsv build/data/MSFT.tsv
touch build/.nojekyll
npx gh-pages -d build/
