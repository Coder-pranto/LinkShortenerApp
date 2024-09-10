


const createShortUrl = async(req, res)=>{
    const {originalUrl} = req.body;

    const baseUrl = process.env.BASE_URL;

    if(!originalUrl){
        return res.status(400).json({message: "Invalid URL"});
    }

    let url = await Url.findOne({originalUrl});

    if(url){
        return res.json(url);
    }else{
        const urlCode = nanoid();
        const shortUrl = `${baseUrl}/${urlCode}`;

        url = new Url({originalUrl, shortUrl, urlCode});
        await url.save();
        
        res.status(201).json({message:'url is created', data: url });
    }
}


const urlRedirector = async(req, res)=>{
    const url = await Url.findOne({urlCode:req.params.code});
    if(url){
        return res.redirect(url.originalUrl);
    }else{
        return res.status(404).json({ message: 'URL not found' });
    }
}