<?php

use app\widgets\TableJs\TableJs;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\helpers\VarDumper;

$this->title = $station_name . ' market';
?>
<main class="flex-grow-1 bg-main-background d-flex flex-column justify-content-between sintony-reg">
    <div class='container-xxl'>
        <div class="row">
            <div class="col mb-3">
                <h1 class='mt-3 text-center fs-2 text-custom-orange sintony-bold'>
                    <?= Html::encode($this->title) ?>
                </h1>
                <div class="d-flex flex-column gap-2 justify-content-center 
                            justify-content-md-start mt-2">
                    <div class="d-flex gap-2 justify-content-center">
                        <div class="small-tile text-light gx-0 rounded-3 fs-7">
                            <a class="nav-button h-100 btn btn-violet border-0 text-light d-flex 
                                    flex-column justify-content-center"
                                href="<?= Url::to(["station/$id"]) ?>">
                                    station info
                                </a>
                        </div>
                        <div class="small-tile text-light gx-0 rounded-3 fs-7">
                            <a class="nav-button h-100 btn btn-violet border-0 text-light d-flex flex-column
                                    justify-content-center active"
                                href="<?= Url::toRoute(["station/market/$id"]) ?>">
                                    market
                                </a>
                        </div>
                        <div class="small-tile text-light gx-0 rounded-3 fs-7">
                            <a class="nav-button h-100 btn btn-violet border-0 text-light d-flex flex-column
                                    justify-content-center"
                                href="<?= Url::toRoute(["station/ship-modules-hardpoint/$id"]) ?>">
                                    outfitting
                                </a>
                        </div>
                        <div class="small-tile text-light gx-0 rounded-3 fs-7">
                            <a class="nav-button h-100 btn btn-violet border-0 text-light d-flex flex-column
                                    justify-content-center"
                                href="<?= Url::toRoute(["station/ship-modules-hardpoint/$id"]) ?>">
                                    ships
                                </a>
                        </div>
                    </div>
                    
                    <?= TableJs::widget([
                        'container' => 'w-table',
                        'model' => $model,
                        'default_sorting' => 'asc',
                        'columns' => [
                            [
                                'attribute' => 'buy_price',
                                'label' => 'buy price',
                                'textAfter' => ' Cr'
                            ],
                            [
                                'attribute' => 'demand',
                            ],
                            [
                                'attribute' => 'demand_bracket',
                                'label' => 'demand bracket',
                                'filter' => ['' => '', '0' => '0', '1' => '1', '2' => '2', '3' => '3'],
                                'filterInputOptions' => [
                                    'class' => 'form-select',
                                ],
                                'class' => 'text-center'
                            ],
                            [
                                'attribute' => 'mean_price',
                                'label' => 'mean price',
                            ],
                            [
                                'attribute' => 'name',
                                'label' => 'commodity',
                                'filterInputOptions' => [
                                    'class' => 'form-control',
                                ]
                            ],
                            [
                                'attribute' => 'sell_price',
                                'label' => 'sell price',
                                'textAfter' => ' Cr'
                            ],
                            [
                                'attribute' => 'stock',
                            ],
                            [
                                'attribute' => 'stock_bracket',
                                'label' => 'stock bracket',
                                'filter' => ['' => '', '0' => '0', '1' => '1', '2' => '2', '3' => '3'],
                                'filterInputOptions' => [
                                    'class' => 'form-select',
                                ],
                                'class' => 'text-center'
                            ],
                            [
                                'attribute' => 'timestamp',
                                'label' => 'updated',
                            ],
                        ]
                    ]); ?>
                </div>
            </div>
        </div>
    </div>
</main>