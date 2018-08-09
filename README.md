# SeatMapClassifier.js

Расставляет классы цен на карте посадки

## dependencies

jquery-X

lodash

## init on page:


### html
```
<script src="path_to_SeatMapClassifier.js" defer></script>

<script>
    var smc = new SeatMapClassifier({
        currency: '₽',
        timeout: 500,
        colors: {
            '249': '#6fafe8',
            '199': '#c2e2fe',
            '1000': '#004993'
        }
    });

    smc.init();
</script>
```

