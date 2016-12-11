# tenable-code

__Build instructions__

1. Install [node](http://nodejs.org) (the version used to build and run this code was node v4.3.0).   
2. Clone this directory, and run `npm install` in your terminal of choice to install the needed node modules (mainly express and its middleware).  
3. Run `npm start` from the terminal to begin the expressJS server that runs the backend endpoints, as well as serves the frontend HTML.  
4. In your browser of choice, navigate to `http://localhost:3000` to see the content. Possible links are:  
   * `http://localhost:3000`  
   * `http://localhost:3000/req1`  
   * `http://localhost:3000/req2`  
   * `http://localhost:3000/req3`  
5. When finished, end the running node script from step 3 in your terminal of choice with ctrl+c.  

__Question 5 Answer:__  

In an instance where the backend would send a high volume of data, instead of 2 objects like in the main example, there are a couple ways to handle it while preserving performance.  

The main way I see to treat it would be to limit how many of the elements are processed and injected into the DOM at a time.  

As an example, segementing the data is a common way to handle this in the real world. Particularly on sites like Salesforce, which may have a large volume of data to show at once, they offer the user control over how many records are rendered on the screen at once. So by default, we could load, say, the first 10 records in the data set. But then, offer the user the option to expand that out to the first 25 records, or first 100 records. That way, for users that just want to get a feel for the data, they aren't bogged down waiting for all the data to load at once. But for those that want to dive deeper into the data, they can do so without also being bogged down by the whole dataset being rendered into the DOM at once. Another approach to this set pagination. So for example, we can force each screen to render a certain subset of the data, and then let the user go between pages for different subsets of the data. A practical example of this would be a set of page buttons along the bottom of a screen, and maybe each page holds 25 records, so the user can see records 1-25 by default, then force records 26-50 to render on page 2, 51-75 on page 3, 76-100 on page 4, etc.  

While this handles rendering performance, it doesn't handle performance dealing with data interaction. For example, how about searching this data for a specific entry?  

For something like that, I would suggest to first use a sorting algorithm to sort the large dataset against the field being searched by. So for example, if searching for a configuration with a specific port number, first sort the dataset in port order. From there, we could use a search algorithm that scales well, such as a binary search algorithm. This would basically mean taking the midpoint of the sorted dataset, and comparing the port number there to the port number we're searching against. If it's a match, we've found the correct configuration. If the desired port number is lower than the midpoint, we take the lower half of the large dataset (in this example, entries 1-5000), and then take the midpoint of that subset and repeat the process above recursively. If the desired port number is higher than the midpoint, we simply instead take the higher half of the large dataset (entries 5001-10000), and then take the midpoint of that subset and repeat the comparison process recursively until a match is found.  