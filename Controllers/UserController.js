import UserHelpers from "../data/helpers/userDb";

const UserController = {
    getUser: (req, res) => {
        const { id } = req.params;
        UserHelpers.get(id)
            .then(user => {
                if ('name' in user) {
                    return res.status(200).json(user);
                }
                return res.status(404).json({ error: 'Cannot find user' });
            })
            .catch(err => res.status(500).json({ error: err }));
    },
    getUserPosts: (req, res) => {
        const { id } = req.params;
        UserHelpers.getUserPosts(id)
        .then(posts => {
            if (posts.length > 0) {
                return res.status(200).json(posts);
            }
            return res.status(400).json({ error: 'this user has no posts' });
        })
        .catch(err => res.status(404).json({ error: 'cannot find user posts' }));
    },
    createUser: (req, res) => {
        const user = req.body;
        if ('name' in user) {
            UserHelpers.insert(user)
                .then(id => {
                    return res.status(201).json({ success: 'user with the id: ${id.id} was created' });
                })
            .catch(err => res.status(500).json({ error: 'could not save new user' }));
    },
    updateUser: (req, res) => {
        const { id } = req.params;
        const user = req.body;
        if ('name' in user) {
            UserHelpers.update(id, user)
                .then(() => res.status(200).json({success: 'updated ${user.name}'}));
                .catch(err => res.status(404).json({ error: 'could not update ${user.name}' }));
        }   else {
            return res.status(404).json({ error: 'invalue parameters' });
    }
    removeUser: (req, res) => { 
        const { id } = req.params;
        UserHelpers.remove(id)
            .then(() => res.status(200).json({ success: 'removed user with the id of ${id}' }))
            .catch(err => res.status(500).json({ error: 'something went wrong' }));
    }
}   

export default UserController;